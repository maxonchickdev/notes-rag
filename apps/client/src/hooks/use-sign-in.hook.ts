import { IResponseError, ISignIn } from '@notes-rag/shared';
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

  const onLocalSigIn = async (token: string) => {
    const response = await fetch(
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.ROUTE_SIGN_IN}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );
    if (!response.ok) {
      const error: IResponseError = JSON.parse(await response.text());
      throw new Error(error.message);
    }
  };

  const onFirebaseSignIn = async (
    app: FirebaseApp,
    email: string,
    password: string,
  ): Promise<string> => {
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

    return credential.user.getIdToken();
  };

  const onSignIn: SubmitHandler<ISignIn> = async (data) => {
    try {
      const token: string = await onFirebaseSignIn(
        app,
        data.email,
        data.password,
      );

      await onLocalSigIn(token);
      router.push(ROUTES.EXPLORE_RAG);
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
