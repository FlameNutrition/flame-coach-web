import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import WorkInProgress from '../../../components/WorkInProgress';

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
        <WorkInProgress
          message="Ops...this page is under construction!"
          submessage="Sorry, we are doing the best for having good features available for you.
          But unfortunately this is a free application and we don't have much time as we liked to work on it."
        />
      </Container>
    </Page>
  );
};

export default Dashboard;
