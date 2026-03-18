import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import passport from 'passport';
import axios from 'axios';
import { ENV_CONFIG } from "../../../config/env.js";

const s3Client = new S3Client({ region: process.env.AWS_REGION ?? 'us-east-1' });

/**
 * 画像をS3にアップロードする関数
 * @param base64Data 画像データ (Base64文字列)
 * @param fileName 保存するファイル名
 */
export const uploadImageToS3 = async (base64Data: string, fileName: string): Promise<string> => {
  const bucketName = ENV_CONFIG.S3_BUCKET_NAME ?? '';

  if (!bucketName) {
    throw new Error('S3_BUCKET_NAME is not defined in environment variables.');
  }

  const buffer = Buffer.from(base64Data, 'base64');

  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return 'ok';
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw error;
  }
};

export const faceRecognitionHandler = async (req: Request, res: Response) => {
  try {

    // console.log(req.session);
    console.log(passport.session);
    const imageData = req.body?.imageData as string | undefined;

    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'imageData(base64) is required.',
      });
    }

    // data URL 形式(data:image/jpeg;base64,...)と純粋なbase64の両方を許可
    const base64Payload = imageData.includes(',') ? imageData.split(',')[1] : imageData;
    if (!base64Payload) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid imageData format.',
      });
    }

    // console.log(req.session);

    const passportUser = req.session.passport?.user;
    const userId = passportUser?.id ?? "tt";
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'User information is not available.',
      });
    }

    const fileName = `face/${userId}/faceImage.jpg`;
    const s3Res = await uploadImageToS3(base64Payload, fileName);

    if (s3Res !== 'ok') {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to upload image to S3.',
      });
    }

    const FACE_AUTH_ENDPOINT = ENV_CONFIG.FACE_AUTH_ENDPOINT;

    // apigatewayを通してlambda発火
    const response = await axios.post(FACE_AUTH_ENDPOINT, {
      userId: userId,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = response.data;

    console.log('Face recognition result:', result);

    if (!result.success) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to recognize face.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Image uploaded to S3 successfully.',
    });
  } catch (error) {
    console.error('Face upload error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to upload image to S3.',
    });
  }
};