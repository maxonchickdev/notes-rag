'use client';

import { Button } from '@mui/material';
import { ICreateUser } from '@notes-rag/shared';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignUpController } from '../../../src/components/sign-up-controller/sign-up-controller.component';

/**
 *
 */
export default function Page() {
  const { control, formState: { errors }, handleSubmit } = useForm<ICreateUser>({
    mode: 'onChange'
  });

  /**
   *
   * @param data
   */
  const onSubmit: SubmitHandler<ICreateUser> = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignUpController 
        control={control} 
        label='Username' 
        name='username' 
        required='Username is required' 
        type='text'
      />
      {errors.username && errors.username.message}

      <SignUpController 
        control={control} 
        label='Email' 
        name='email' 
        required='Email is required' 
        type='text' 
      />
      {errors.email && errors.email.message}

      <SignUpController 
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