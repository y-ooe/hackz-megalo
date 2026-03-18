import type { Request, Response } from 'express';
import { generators } from 'openid-client';
import { ENV_CONFIG } from '../../../config/env.js';
import { getAmazonClient } from './amazon.client.js';

const frontendUrl = ENV_CONFIG.FRONTEND_URL;
const AMAZON_CALLBACK_URL = ENV_CONFIG.AMAZON_CALLBACK_URL;
const AMAZON_CLIENT_ID = ENV_CONFIG.AMAZON_CLIENT_ID;
const COGNITO_DOMAIN = ENV_CONFIG.COGNITO_DOMAIN;


// ログイン
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
try {
    const client = await getAmazonClient();
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    // セッションを手動で保存してからリダイレクトする
    req.session.save((err) => {
        if (err) throw err;
        
        const authUrl = client.authorizationUrl({
        scope: 'email openid profile',
        state: state,
        nonce: nonce,
        });

        // console.log('Redirecting to Cognito/Amazon:', authUrl);
        // console.log('callback URL:', AMAZON_CALLBACK_URL);
        res.redirect(authUrl);
    });
    } catch (err) {
        console.error('Amazon login error:', err);
        res.redirect(`${frontendUrl}/?amazonAuth=failed`);
    }
};


// コールバック
export const callbackHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const client = await getAmazonClient();
        const params = client.callbackParams(req);
        const nonce = req.session.nonce;
        const state = req.session.state;

        if (!nonce || !state) {
            throw new Error('Missing nonce/state in session.');
        }

        const tokenSet = await client.callback(AMAZON_CALLBACK_URL, params, {
            nonce,
            state,
        });

        const accessToken = tokenSet.access_token;
            if (!accessToken) {
                throw new Error('No access token received from Cognito.');
        }

        const userInfo = await client.userinfo(accessToken);
        req.session.userInfo = userInfo;

        // console.log(req.session);

        try {
            const esp32Url = `http://${ENV_CONFIG.ESP32_IP}/amazon`;
            await fetch(esp32Url, { method: 'GET', signal: AbortSignal.timeout(2000) });
            console.log('ESP32への命令送信に成功しました');
        } catch (error) {
            console.error('ESP32への通信に失敗しましたが、処理を続行します:', error);
        }

        res.redirect(`${frontendUrl}/?amazonAuth=success`);
    } catch (err) {
        console.error('Amazon callback error:', err);
        res.redirect(`${frontendUrl}/?amazonAuth=failed`);
    }
};

// ログアウト
export const logoutHandler = (req: Request, res: Response): void => {
  req.session.destroy(() => {
    const logoutUri = ENV_CONFIG.AMAZON_LOGOUT_URI ?? frontendUrl;
    const logoutUrl = `${COGNITO_DOMAIN}/logout?client_id=${AMAZON_CLIENT_ID}&logout_uri=${encodeURIComponent(logoutUri)}`;
    res.redirect(logoutUrl);
  });
};
