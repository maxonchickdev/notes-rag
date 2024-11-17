import { registerAs } from '@nestjs/config';

export const JWT_ACCESS_CONFIG = 'jwt-access';

export default registerAs(JWT_ACCESS_CONFIG, () => ({
	access: {
		expiresIn: process.env.JWT_ACCESS_EXPIRES,
		secret: process.env.JWT_ACCESS_SECRET
	}
}));
