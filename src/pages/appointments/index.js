import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Whitelist from '../../route/whitelist';
import { useRouter } from 'next/router';

const Appointments = () => {

  const router = useRouter();

  return (
    <Whitelist router={router}>
      <DashboardLayout>
        <div>hello</div>
      </DashboardLayout>
    </Whitelist>
  );

};

export default Appointments;


