import { registerAs } from '@nestjs/config';

export const HTTP_CONFIG = 'http';

export default registerAs(HTTP_CONFIG, () => ({
  maxRedirects: process.env.HTTP_MODULE_MAX_REDIRECTS,
  timeout: process.env.HTTP_MODULE_TIMEOUT,
}));
