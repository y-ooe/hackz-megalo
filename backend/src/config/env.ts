import dotenv from 'dotenv';

dotenv.config();

export const ENV_CONFIG = {
    ESP32_IP: process.env.ESP32_IP ?? '',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? '',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL ?? `${process.env.API_BASE_URL ?? 'http://localhost:3000'}/auth/github/callback`,
    AMAZON_CLIENT_ID: process.env.AMAZON_CLIENT_ID ?? '',
    AMAZON_CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET ?? '',
    COGNITO_ISSUER: process.env.COGNITO_ISSUER ?? '',
    COGNITO_DOMAIN: process.env.COGNITO_DOMAIN ?? '',
    FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    API_BASE_URL: process.env.API_BASE_URL ?? 'http://localhost:3000',
    AMAZON_CALLBACK_URL: process.env.AMAZON_CALLBACK_URL ?? `${process.env.API_BASE_URL ?? 'http://localhost:3000'}/auth/amazon/callback`,
    AMAZON_LOGOUT_URI: process.env.AMAZON_LOGOUT_URI ?? '',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ?? `${process.env.API_BASE_URL ?? 'http://localhost:3000'}/auth/google/callback`,
}