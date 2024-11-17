'use client';

import { Button } from '@mui/material';
import { ISignInUser } from '@notes-rag/shared';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from '../../src/axios/axios.config';
import { SignInController } from '../../src/components/sign-in-controller/sign-in-controller.component';

/**
 *
 */
export default function Page() {
  const router = useRouter();
  const [err, setErr] = useState<string>('');
  const { control, formState: { errors }, handleSubmit } = useForm<ISignInUser>({
    mode: 'onChange'
  });

  /**
   *
   * @param data
   */
  const onSubmit: SubmitHandler<ISignInUser> = async (data) => {
    try {
      const res = await axiosInstance({
        data: data,
        method: 'post',
        url: 'user/sign-in'
      });
      router.push('explore-rags');
    } catch (err) {
      setErr(err as string);
    }
  };

  console.log(err);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignInController 
        control={control} 
        label='Email' 
        name='email' 
        required='Email is required' 
        type='text' 
      />
      {errors.email && errors.email.message}
      
      <SignInController 
        control={control} 
        label='Password' 
        name='password' 
        required='Password is required' 
        type='password'
      />
      {errors.password && errors.password.message}
      
      <Button fullWidth type='submit' variant='outlined'>Sign in</Button>
    </form>
  );
}