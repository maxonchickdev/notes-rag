import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG = 'database';

export default registerAs(DATABASE_CONFIG, () => ({
  users: {
    uri: process.env.DATABASE_URL,
  },
}));
