import { ISignIn } from './sign-in-user.interface';

export type IResetPassword = Omit<ISignIn, 'password'>;
