import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

/**
 *
 */
export class SignInUserDto extends OmitType(CreateUserDto, [
  'username',
] as const) {}
