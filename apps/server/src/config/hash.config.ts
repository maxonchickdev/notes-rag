import { registerAs } from '@nestjs/config';

export const HASH_CONFIG = 'hash';

export default registerAs(HASH_CONFIG, () => ({
	saltOrRounds: process.env.SALT_OR_ROUNDS
}));
