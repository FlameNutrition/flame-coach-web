import DashboardLayout from '../../layouts/DashboardLayout';
import React from 'react';
import { useSession } from 'next-auth/client';
import Auth from '../../route/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const Appointments = dynamic(() => import('../../views/appointments'));

const AppointmentsPage = () => {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return null;

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Appointments
              customerIdentifier={session.user.identifier}
            />
          </MuiPickersUtilsProvider>
        </DashboardLayout> : null
      }
    </Auth>
  );
}
;

export default AppointmentsPage;


