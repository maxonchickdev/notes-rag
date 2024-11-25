import { registerAs } from '@nestjs/config';

export const JWT_REFRESH_CONFIG = 'jwt-refresh';

export default registerAs(JWT_REFRESH_CONFIG, () => ({
  refresh: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
    secret: process.env.JWT_REFRESH_SECRET,
  },
}));
