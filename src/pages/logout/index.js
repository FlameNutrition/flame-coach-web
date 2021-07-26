import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const LogoutPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (session) {
      signOut({
        callbackUrl: `${window.location.origin}/login`
      });
    } else {
      router.replace('/login');
    }
  });

  return (
    <></>
  );
};

export default LogoutPage;
