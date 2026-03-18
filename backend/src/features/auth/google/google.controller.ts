import type { Request, Response } from 'express';

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

export const googleSuccessHandler = (req: Request, res: Response) => {
  if (req.user) {

    
    res.redirect(`${frontendUrl}/?googleAuth=success`);
    return;
  }

  res.redirect(`${frontendUrl}/?googleAuth=failed`);
};

export const googleFailureHandler = (_req: Request, res: Response) => {
  res.redirect(`${frontendUrl}/?googleAuth=failed`);
};
