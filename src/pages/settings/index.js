import React from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import dynamic from 'next/dynamic';
import DashboardLayout from '../../layouts/DashboardLayout';

const SettingsView = dynamic(() => import('../../views/settings'));

const SettingsPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <SettingsView customerEmail={session.user.username}/>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default SettingsPage;
