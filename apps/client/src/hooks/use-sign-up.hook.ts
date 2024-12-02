import { ICreateUserWithUid, ISignUp } from '@notes-rag/shared';
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

      const createUserWithUId: ICreateUserWithUid = {
        uId: credential.user.uid,
      };

      await sendEmailVerification(credential.user);

      await fetch(
        `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.ROUTE_SIGN_UP}`,
        {
          body: JSON.stringify(createUserWithUId),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      );

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
    onSignUp,
  };
};
