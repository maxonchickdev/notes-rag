'use client';

import { Button } from '@mui/material';

import { SignUpController } from '../../../src/components/sign-up-controller/sign-up-controller.component';
import { usePasswordReset } from '../../../src/hooks/use-password.hook';

export default function Page() {
  const { control, errors, handleSubmit, onResetPassword } = usePasswordReset();

  return (
    <form onSubmit={handleSubmit(onResetPassword)}>
      <SignUpController
        control={control}
        label="Email"
        name="email"
        required="Email is required"
        type="text"
      />
      {errors.email && errors.email.message}

      <Button fullWidth type="submit" variant="outlined">
        Send reset password email
      </Button>
    </form>
  );
}
