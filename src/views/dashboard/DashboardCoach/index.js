import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

import Page from '../../../components/Page';
import UnderConstruction from '../../../components/UnderConstruction';

const workInProgressMessage = 'Ops...this page is under construction!';
const workInProgressSubMessage = 'Sorry, we are doing the best for having good features available for you. But unfortunately this is a free application and we don\'t have much time as we liked to work on it.';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container>
        <UnderConstruction
          message={workInProgressMessage}
          submessage={workInProgressSubMessage}
        />
      </Container>
    </Page>
  );
};

export default Dashboard;
