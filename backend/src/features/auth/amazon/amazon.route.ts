import { Router } from 'express';

import { callbackHandler, loginHandler, logoutHandler } from './amazon.controller.js';

const router = Router();

// GET /auth/amazon/login  → Cognito の認証画面へリダイレクト
router.get('/login', loginHandler);

// GET /auth/amazon/callback  → Cognito からのコールバック処理
router.get('/callback', callbackHandler);

// GET /auth/amazon/logout  → セッション破棄 & Cognito ログアウト
router.get('/logout', logoutHandler);

export default router;
