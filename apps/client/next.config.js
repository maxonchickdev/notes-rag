//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 */
const nextConfig = {
  env: {
    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,

    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,

    ROUTE_SIGN_UP: process.env.ROUTE_SIGN_UP,
    ROUTE_SIGN_IN: process.env.ROUTE_SIGN_IN,
    ROUTE_NOTION_API_TOKEN_HEALTH_CHECK:
      process.env.ROUTE_NOTION_API_TOKEN_HEALTH_CHECK,

    ROUTE_GET_RAG_HISTORY: process.env.ROUTE_GET_RAG_HISTORY,
    ROUTE_GET_DOCUMENTS: process.env.ROUTE_GET_DOCUMENTS,

    ROUTE_POST_QUERY: process.env.ROUTE_POST_QUERY,

    ROUTE_SIGN_OUT: process.env.ROUTE_SIGN_OUT,
  },
  nx: {
    svgr: false,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
