import Auth from '../../route/auth';
import dynamic from 'next/dynamic';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

const NotFoundView = dynamic(() => import('../../views/notFound/NotFoundView'));

const NotFound = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <NotFoundView/>
        </DashboardLayout> : null}
    </Auth>
  );
};

export default NotFound;
