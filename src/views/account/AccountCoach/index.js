import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import logger from 'loglevel';
import Profile from '../Profile';
import ProfileDetails from '../ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetailsHandler = (event) => {
    logger.debug('Update user details');
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    });
  };

  const updatePhotoHandler = () => {
    logger.debug('Update photo');
  };

  const saveUserDetailsHandler = () => {
    logger.debug('Save user details');
  };

  // TODO: Add a spinner
  return (
    userDetails !== null ? (
      <Page
        className={classes.root}
        title="Account"
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Profile user={userDetails} updatePhotoHandler={updatePhotoHandler} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetails
                userDetails={userDetails}
                saveUserDetailsHandler={saveUserDetailsHandler}
                updateUserDetailsHandler={updateUserDetailsHandler}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    ) : null
  );
};

export default Account;
