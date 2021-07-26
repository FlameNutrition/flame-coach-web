import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import dynamic from 'next/dynamic';

const ClientsView = dynamic(() => import('../../views/customer'));

const ClientsPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <ClientsView customerIdentifier={session.user.identifier}/>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default ClientsPage;
