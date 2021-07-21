import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import useRoute from '../route/useRoute';

const IndexPage = () => {
  const routing = useRoute();

  return (
    <DashboardLayout>
      {routing.element}
    </DashboardLayout>
  );
};

export default IndexPage;