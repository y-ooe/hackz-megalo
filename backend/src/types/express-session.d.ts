export {};

declare module 'express-session' {
  interface SessionData {
    nonce?: string;
    state?: string;
    userInfo?: Record<string, unknown>;
    passport?: {
      user?: {
        id?: string;
      };
    };
  }
}
