import { ISignUp } from '@notes-rag/shared';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { app } from '../configs/firebase.config';
import { ROUTES } from '../enums/routes.enum';

export const useSignUp = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignUp>({
    mode: 'onChange',
  });

  const onSignUp: SubmitHandler<ISignUp> = async (data) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        getAuth(app),
        data.email,
        data.password,
      );

      await sendEmailVerification(credential.user);

      enqueueSnackbar(`Check enail ${data.email}`, {
        variant: 'success',
      });

      await fetch(
        `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/user`,
        {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );
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
    onSignUp,
  };
};
