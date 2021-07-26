import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import dynamic from 'next/dynamic';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const MeasuresView = dynamic(() => import('../../views/measures'));

const MeasuresPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MeasuresView customerIdentifier={session.user.identifier}/>
          </MuiPickersUtilsProvider>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default MeasuresPage;
