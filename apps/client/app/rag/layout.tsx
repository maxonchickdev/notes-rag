'use client';

import { FC, ReactNode } from 'react';

import { withAuth } from '../../src/hocs/with-auth.hoc';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default withAuth(Layout);
