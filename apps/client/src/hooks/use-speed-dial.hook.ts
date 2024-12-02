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
    router.push(ROUTES.SIGN_UP);
  }, []);

  const onPushToSignIn = useCallback(() => {
    router.push(ROUTES.SIGN_IN);
  }, []);

  const onPushToResetPassword = useCallback(() => {
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
