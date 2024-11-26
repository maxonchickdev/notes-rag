import { ISignIn } from '@notes-rag/shared';
import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { app } from '../configs/firebase.config';
import { ROUTES } from '../enums/routes.enum';

export const useSignIn = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignIn>({
    mode: 'onChange',
  });

  const onLocalSigIn = async (token: string, data: ISignIn) => {
    await fetch(
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sign-in`,
      {
        body: JSON.stringify(data),
        headers: {
          Auth: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
  };

  const onFirebaseSignIn = async (
    app: FirebaseApp,
    email: string,
    password: string,
  ) => {
    const credential = await signInWithEmailAndPassword(
      getAuth(app),
      email,
      password,
    );
    if (!credential.user.emailVerified) {
      enqueueSnackbar('Email not verified', {
        variant: 'error',
      });
    }
    return credential;
  };

  const onSignIn: SubmitHandler<ISignIn> = async (data) => {
    try {
      const credential = await onFirebaseSignIn(app, data.email, data.password);
      // await onLocalSigIn(await credential.user.getIdToken(), data);
      router.push(ROUTES.EXPLORE_RAGS);
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
    onSignIn,
  };
};
