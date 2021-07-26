import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Auth from '../route/auth';
import dynamic from 'next/dynamic';
import DashboardLayout from '../layouts/DashboardLayout';
import { logInfo } from '../logging';

const DashboardClientView = dynamic(() => import('../views/dashboard/DashboardClient'));
const DashboardCoachView = dynamic(() => import('../views/dashboard/DashboardCoach'));

const IndexPage = () => {

    const [session, loading] = useSession();
    const router = useRouter();

    if (loading) return null;

    logInfo('IndexPage', 'render', 'session', session);

    return (
      <Auth router={router}>
        {session ?
          <DashboardLayout user={session.user}>
            {session.user.type === 'CLIENT' ?
              <DashboardClientView
                customerIdentifier={session.user.identifier}/>
              : <DashboardCoachView/>}
          </DashboardLayout> : null
        }
      </Auth>
    );
  }
;

export default IndexPage;
