'use client';

import { Button } from '@mui/material';
import { ICreateUser } from '@notes-rag/shared';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from '../../../src/axios/axios.config';
import { SignUpController } from '../../../src/components/sign-up-controller/sign-up-controller.component';

export default function Page() {
  const [err, setErr] = useState<string>('');
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateUser>({
    mode: 'onChange',
  });

  console.log(err);

  const onSignUpUser: SubmitHandler<ICreateUser> = async (data) => {
    try {
      await axiosInstance({
        data: data,
        method: 'post',
        url: 'user',
      });
      router.push('/');
    } catch (err) {
      setErr(err as string);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSignUpUser)}>
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
