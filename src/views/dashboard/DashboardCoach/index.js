import React from 'react';

import Page from '../../../components/Page';
import UnderConstruction from '../../../components/UnderConstruction';

const workInProgressMessage = 'Ops...this page is under construction!';
const workInProgressSubMessage = 'Sorry, we are doing the to have good features available to you. But unfortunately this is a free application and we don\'t have as much time as we would like to work on it.';

const Dashboard = () => {
  return (
    <Page
      title="Dashboard"
      isError={false}
      isLoading={false}
    >
      <UnderConstruction
        message={workInProgressMessage}
        submessage={workInProgressSubMessage}
      />
    </Page>
  );
};

export default Dashboard;
