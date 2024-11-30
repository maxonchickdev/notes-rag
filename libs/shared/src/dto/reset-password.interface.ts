import { ISignIn } from './sign-in.interface';

export type IResetPassword = Omit<ISignIn, 'password'>;
