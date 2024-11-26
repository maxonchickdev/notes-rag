'use client';

import { Button } from '@mui/material';

import { SignInController } from '../../src/components/sign-in-controller/sign-in-controller.component';
import { useSignIn } from '../../src/hooks/use-sign-in.hook';

export default function Page() {
  const { control, errors, handleSubmit, onSignIn } = useSignIn();

  return (
    <form onSubmit={handleSubmit(onSignIn)} style={{ marginBottom: '10px' }}>
      <SignInController
        control={control}
        label="Email"
        name="email"
        required="Email is required"
        type="text"
      />
      {errors.email && errors.email.message}

      <SignInController
        control={control}
        label="Password"
        name="password"
        required="Password is required"
        type="password"
      />
      {errors.password && errors.password.message}

      <Button fullWidth type="submit" variant="outlined">
        Sign in
      </Button>
    </form>
  );
}
