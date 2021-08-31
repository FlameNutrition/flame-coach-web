import Auth from '../../route/auth';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Page from '../../components/Page';
import NotFound from '../../components/NotFound';

const NotFoundPage = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <Auth router={router}>
      {session ?
        <DashboardLayout user={session.user}>
          <Page
            title="404 - Page not found"
            isLoading={false}
            isError={false}
          >
            <NotFound
              title="The page you are looking for isn’t here"
              submessage="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation"
            />
          </Page>
        </DashboardLayout> : null}
    </Auth>
  );
};

export default NotFoundPage;
