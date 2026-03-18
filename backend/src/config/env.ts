import dotenv from 'dotenv';

dotenv.config();

export const ENV_CONFIG = {
    ESP32_IP: process.env.ESP32_IP ?? '',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? '',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',
    AMAZON_CLIENT_ID: process.env.AMAZON_CLIENT_ID ?? '',
    AMAZON_CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET ?? '',
    COGNITO_ISSUER: process.env.COGNITO_ISSUER ?? '',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    API_BASE_URL: process.env.API_BASE_URL ?? 'http://localhost:3000',
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL ?? `${process.env.API_BASE_URL ?? 'http://localhost:3000'}/auth/github/callback`,
    AMAZON_CALLBACK_URL: process.env.AMAZON_CALLBACK_URL ?? `${process.env.API_BASE_URL ?? 'http://localhost:3000'}/auth/amazon/callback`,
    AMAZON_LOGOUT_URI: process.env.AMAZON_LOGOUT_URI ?? `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}`,
    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN ?? '',
}