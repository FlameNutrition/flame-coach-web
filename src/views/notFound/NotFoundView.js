import { makeStyles } from '@material-ui/core';
import React from 'react';

import NotFound from '../../components/NotFound';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404 - Page not found"
    >
      <NotFound
        title="The page you are looking for isn’t here"
        submessage="You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation"
      />
    </Page>
  );
};

export default NotFoundView;
