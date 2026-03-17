import type { Request, Response } from 'express';

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

export const githubSuccessHandler = (req: Request, res: Response) => {
  if (req.user) {

    
    res.redirect(`${frontendUrl}/?githubAuth=success`);
    return;
  }

  res.redirect(`${frontendUrl}/?githubAuth=failed`);
};

export const githubFailureHandler = (_req: Request, res: Response) => {
  res.redirect(`${frontendUrl}/?githubAuth=failed`);
};
