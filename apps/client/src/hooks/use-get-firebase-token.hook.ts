import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { app } from '../configs/firebase.config';

export const useGetFirebaseToken = () => {
  const [token, setToken] = useState<string>('');
  const getFirebaseToken = async () => {
    const firebaseToken = await getAuth(app).currentUser?.getIdToken();
    if (firebaseToken) setToken(firebaseToken as string);
  };

  useEffect(() => {
    getFirebaseToken();
  }, [token]);

  return { token };
};
