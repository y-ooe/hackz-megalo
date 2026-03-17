import type { Request, Response } from 'express';

type VerifyOtpBody = {
  otpCode?: string;
};

export const verifyOtpHandler = (req: Request<object, object, VerifyOtpBody>, res: Response) => {
  const otpCode = req.body?.otpCode?.trim() ?? '';

  if (!/^\d{6}$/.test(otpCode)) {
    res.status(400).json({
      success: false,
      message: 'OTP must be 6 digits.',
    });
    return;
  }

  // NOTE: Placeholder for feature-specific OTP verification logic.
  res.status(200).json({
    success: true,
    message: 'OTP verification succeeded.',
  });
};
