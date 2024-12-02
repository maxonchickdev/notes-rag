import { getAuth } from 'firebase/auth';

import { app } from '../configs/firebase.config';

export const useGetFirebaseToken = () => {
  const getFirebaseToken = async () => {
    const token = await getAuth(app).currentUser?.getIdToken();
    return token;
  };

  return { getFirebaseToken };
};
