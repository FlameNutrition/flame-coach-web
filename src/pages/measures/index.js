import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import dynamic from 'next/dynamic';

const MeasuresView = dynamic(() => import('../../views/measures'));

const MeasuresPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <MeasuresView customerIdentifier={session.user.identifier}/>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default MeasuresPage;
