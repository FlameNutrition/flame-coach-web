import DashboardLayout from '../../layouts/DashboardLayout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import React from 'react';
import dynamic from 'next/dynamic';

const AccountCoachView = dynamic(() => import('../../views/account/AccountCoach'));
const AccountClientView = dynamic(() => import('../../views/account/AccountClient'));

const AccountPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          {session.user.type === 'CLIENT' ?
            <AccountClientView
              customerIdentifier={session.user.identifier}
              email={session.user.username}/> :
            <AccountCoachView
              customerIdentifier={session.user.identifier}
              email={session.user.username}/>}
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default AccountPage;
