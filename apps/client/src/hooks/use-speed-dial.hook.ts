import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { ROUTES } from '../enums/routes.enum';

export const useSpeedDial = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenSpeedDial = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseSpeedDial = useCallback(() => {
    setOpen(false);
  }, []);

  const onPushToSignUp = useCallback(() => {
    console.log('sign up push');
    router.push(ROUTES.SIGN_UP);
  }, []);

  const onPushToSignIn = useCallback(() => {
    console.log('sign in push');
    router.push(ROUTES.SIGN_IN);
  }, []);

  const onPushToResetPassword = useCallback(() => {
    console.log('reset password push');
    router.push(ROUTES.PASSWORD_RESET);
  }, []);

  return {
    handleCloseSpeedDial,
    handleOpenSpeedDial,
    onPushToResetPassword,
    onPushToSignIn,
    onPushToSignUp,
    open,
  };
};
