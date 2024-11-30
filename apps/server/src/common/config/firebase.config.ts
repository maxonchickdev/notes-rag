import { registerAs } from '@nestjs/config';

export const FIREBASE_CONFIG = 'firebase';

export default registerAs(FIREBASE_CONFIG, () => ({
  credential: {
    authProviderX509CertUrl:
      process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
    clientX509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY as string).replace(
      /\\n/g,
      '\n',
    ),
    privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    type: process.env.FIREBASE_ADMIN_TYPE,
    universeDomain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  },
}));
