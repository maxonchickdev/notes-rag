import { registerAs } from '@nestjs/config';

export const NOTION_CONFIG = 'notion';

export default registerAs(NOTION_CONFIG, () => ({
  healthCheck: process.env.NOTION_API_TOKEN_HEALTH_CHECK,
}));
