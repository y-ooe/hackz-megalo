import { Issuer, type BaseClient } from 'openid-client';
import { ENV_CONFIG } from '../../../config/env.js';

const COGNITO_ISSUER = ENV_CONFIG.COGNITO_ISSUER;
const AMAZON_CLIENT_ID = ENV_CONFIG.AMAZON_CLIENT_ID;
const AMAZON_CLIENT_SECRET = ENV_CONFIG.AMAZON_CLIENT_SECRET;
const AMAZON_CALLBACK_URL = ENV_CONFIG.AMAZON_CALLBACK_URL;

let clientInstance: BaseClient | null = null;

export async function getAmazonClient(): Promise<BaseClient> {
  if (clientInstance !== null) {
    return clientInstance;
  }

  const issuer = await Issuer.discover(COGNITO_ISSUER);
  clientInstance = new issuer.Client({
    client_id: AMAZON_CLIENT_ID,
    client_secret: AMAZON_CLIENT_SECRET,
    redirect_uris: [AMAZON_CALLBACK_URL],
    response_types: ['code'],
  });

  return clientInstance;
}
