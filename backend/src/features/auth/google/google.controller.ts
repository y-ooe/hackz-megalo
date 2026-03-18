import type { Request, Response } from 'express';
import { ENV_CONFIG } from "../../../config/env.js";
import axios from "axios";

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const esp32Ip = ENV_CONFIG.ESP32_IP;

export const googleSuccessHandler = async(req: Request, res: Response) => {
  if (req.user) {
    try {
      const esp32Url = `http://${esp32Ip}/google`;
      
      // タイムアウトを設定しておくと、ESP32がオフラインでもリダイレクトが詰まらない
      await axios.get(esp32Url, { timeout: 2000 }); 
      
      console.log('ESP32への命令送信に成功しました');
    } catch (error) {
      console.error('ESP32への通信に失敗しましたが、処理を続行します:', error);
    }

    res.redirect(`${frontendUrl}/?googleAuth=success`);
    return;
  }

  res.redirect(`${frontendUrl}/?googleAuth=failed`);
};

export const googleFailureHandler = (_req: Request, res: Response) => {
  res.redirect(`${frontendUrl}/?googleAuth=failed`);
};
