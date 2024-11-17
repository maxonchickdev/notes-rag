'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { axiosInstance } from '../../src/axios/axios.config';
import { HeaderComponent } from '../../src/components/header/header-component';

/**
 *
 */
export default function Page() {
  const router = useRouter();
  const [err, setErr] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  /**
   *
   */
  const onLogout = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: 'user/logout'
      });
      router.push('/');
    } catch (err) {
      setErr(err as string);
    }
  };
  return (
    <HeaderComponent onLogout={onLogout} open={open} setOpen={setOpen} />
  );
}
