import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import logger from 'loglevel';
import Profile from '../../../components/Profile';
import ProfileDetails from '../../../components/ProfileDetails';
import { getUserDetails, updateUserDetails } from '../../../axios';

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

  useEffect(() => {
    if (userDetails === null) {
      getUserDetails(2)
        .then((response) => {
          setUserDetails(response);
        })
        .catch(() => setUserDetails(null));
    }
  }, []);

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
    updateUserDetails({ uuid: 'TEXT' })
      .then((response) => {
        setUserDetails(response);
      })
      .catch(() => setUserDetails(null));
  };

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
                enablePersonalData
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
