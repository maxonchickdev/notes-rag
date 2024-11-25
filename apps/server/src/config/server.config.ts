import { registerAs } from '@nestjs/config';

export const SERVER_CONFIG = 'server';

export default registerAs(SERVER_CONFIG, () => ({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
}));
