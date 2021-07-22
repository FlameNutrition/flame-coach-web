import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';
import React from 'react';

import Page from '../../../components/Page';
import UnderConstruction from '../../../components/UnderConstruction';

const workInProgressMessage = 'Ops...this page is under construction!';
const workInProgressSubMessage = 'Sorry, we are doing the to have good features available to you. But unfortunately this is a free application and we don\'t have as much time as we would like to work on it.';

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
