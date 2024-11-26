import { IResetPassword } from '@notes-rag/shared';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { app } from '../configs/firebase.config';
import { ROUTES } from '../enums/routes.enum';

export const usePasswordReset = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IResetPassword>({
    mode: 'onChange',
  });
  const onResetPassword: SubmitHandler<IResetPassword> = async (data) => {
    try {
      sendPasswordResetEmail(getAuth(app), data.email);
      enqueueSnackbar(`Check enail ${data.email}`, {
        variant: 'success',
      });
      router.push(ROUTES.SIGN_IN);
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error',
      });
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    onResetPassword,
  };
};
