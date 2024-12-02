'use client';

import { IResponseError } from '@notes-rag/shared';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { app } from '../configs/firebase.config';
import { ROUTES } from '../enums/routes.enum';

export const useLogout = () => {
  const router = useRouter();

  const localLogout = async () => {
    const response = await fetch(
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sign-out`,
    );
    if (!response.ok) {
      const error: IResponseError = JSON.parse(await response.text());
      throw new Error(error.message);
    }
  };

  const firebaseLogout = async () => {
    try {
      await getAuth(app).signOut();
    } catch (err) {
      throw new Error(err as string);
    }
  };

  const onSignOut = async () => {
    try {
      await localLogout();
      await firebaseLogout();
      router.push(ROUTES.SIGN_IN);
    } catch (err) {
      enqueueSnackbar((err as Error).message, {
        variant: 'error',
      });
    }
  };

  return {
    onSignOut,
  };
};
