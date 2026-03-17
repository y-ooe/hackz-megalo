import { Issuer, type BaseClient } from 'openid-client';

const COGNITO_ISSUER =
  process.env.COGNITO_ISSUER ?? '';
const AMAZON_CLIENT_ID = process.env.AMAZON_CLIENT_ID ?? '';
const AMAZON_CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET ?? '';
const AMAZON_CALLBACK_URL =
  process.env.AMAZON_CALLBACK_URL ?? 'http://localhost:3000/auth/amazon/callback';

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
