import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../../route/auth';
import dynamic from 'next/dynamic';
import { logInfo } from '../../logging';

const PlannerView = dynamic(() => import('../../views/planner'));

const PlannerPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  logInfo('IndexPage', 'render', 'session', session);

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <PlannerView customerIdentifier={session.user.identifier}/>
          </MuiPickersUtilsProvider>
        </DashboardLayout> : null
      }
    </Auth>
  );
};

export default PlannerPage;
