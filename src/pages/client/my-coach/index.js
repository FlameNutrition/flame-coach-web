
import React from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../../route/auth';
import dynamic from 'next/dynamic';

const MyCoachView = dynamic(() => import('../../../views/my-coach'));

const MyCoachPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <MyCoachView customerIdentifier={session.user.identifier} />
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default MyCoachPage;
