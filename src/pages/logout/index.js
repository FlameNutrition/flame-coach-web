import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const LogoutPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(async () => {
    if (loading) return;
    if (session) {
      const response = await signOut({
        callbackUrl: `${process.env.NEXTAUTH_URL}`,
        redirect: false
      });

      router.replace(response.url);
    } else {
      router.replace('/login');
    }
  });

  return null;
};

export default LogoutPage;
