// backend/src/features/auth/otp/index.ts の1行目を以下に書き換え
import { Router, type Request, type Response } from 'express';// @ts-ignore (nexmoに型定義がない場合のエラー回避)
import Nexmo from 'nexmo';

const router = Router();

// Nexmoの設定（以前のチャットで確認したキーを使用）
const nexmo = new Nexmo({
  apiKey: '1e4f4c27',
  apiSecret: 'C9zVBHzI0sLaVS5E'
});

/**
 * Step1用: SMS認証リクエストを送信する
 * POST /api/auth/otp/verify
 */
router.post('/verify', (req: Request, res: Response) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ message: '電話番号が必要です' });
  }

  nexmo.verify.request({
    number: number,
    brand: 'Hackz-Megalo',
    code_length: 6,
    workflow_id: 6 // SMSのみ（音声なし）
  }, (err: any, result: any) => {
    // ステータスが "0" なら成功
    if (result.status !== '0') {
      console.error('Nexmo Error:', result.error_text);
      return res.status(400).json({ message: result.error_text });
    }

    // FrontendのStep1にrequestIdを返す
    res.json({ requestId: result.request_id });
  });
});

/**
 * Step2用: 届いたコードをチェックする
 * POST /api/auth/otp/check
 */
router.post('/check', (req: Request, res: Response) => {
  const { requestId, code } = req.body;

  if (!requestId || !code) {
    return res.status(400).json({ message: 'IDとコードが必要です' });
  }

  nexmo.verify.check({
    request_id: requestId,
    code: code
  }, (err: any, result: any) => {
    if (result.status !== '0') {
      return res.status(400).json({ message: result.error_text });
    }

    // 認証成功
    res.json({ success: true });
  });
});

export default router;