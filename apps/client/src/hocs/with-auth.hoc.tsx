'use client';

import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ComponentType, FC, useCallback, useEffect, useState } from 'react';

import { BackdropComponent } from '../components/backdrop/backdrop.component';
import { app } from '../configs/firebase.config';
import { ROUTES } from '../enums/routes.enum';

export const withAuth = <T extends object>(Component: ComponentType<T>) => {
  const ComponentWithAuth: FC<T> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => {
      setOpen(true);
    }, []);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        getAuth(app),
        (firebaseUser: null | User) => {
          if (firebaseUser) {
            setIsLoading(false);
          } else {
            handleOpen();
            router.push(ROUTES.SIGN_IN);
          }
        },
      );
      return () => unsubscribe();
    }, []);

    if (isLoading) {
      return <BackdropComponent open={open} />;
    }

    return <Component {...props} />;
  };

  return ComponentWithAuth;
};
