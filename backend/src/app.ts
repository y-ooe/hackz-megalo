import cors from 'cors';
import express from 'express';
import session from 'express-session';

import passport from './config/passport.js';
import authRoutes from './features/auth/auth.routes.js';
import { loggerMiddleware } from './middlewares/logger.js';

export function createApp() {
  const app = express();
  const sessionSecret = process.env.SESSION_SECRET || 'dev-session-secret';

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: false },
    }),
  );

  app.use(
    cors({
      origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  app.use(express.json());
  app.use(loggerMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (_req, res) => {
    res.send('Welcome to TypeScript!');
  });

  app.use('/auth', authRoutes);

  return app;
}
