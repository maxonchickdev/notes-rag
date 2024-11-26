'use client';

import { Button } from '@mui/material';

import { SignUpController } from '../../../src/components/sign-up-controller/sign-up-controller.component';
import { useSignUp } from '../../../src/hooks/use-sign-up.hook';

export default function Page() {
  const { control, errors, handleSubmit, onSignUp } = useSignUp();
  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <SignUpController
        control={control}
        label="Username"
        name="username"
        required="Username is required"
        type="text"
      />
      {errors.username && errors.username.message}

      <SignUpController
        control={control}
        label="Email"
        name="email"
        required="Email is required"
        type="text"
      />
      {errors.email && errors.email.message}

      <SignUpController
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
