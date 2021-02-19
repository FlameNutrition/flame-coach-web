import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles, TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({
  handleUserDetails, userDetails, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Contact information"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleUserDetails}
                required
                value={userDetails.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleUserDetails}
                required
                value={userDetails.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleUserDetails}
                required
                value={userDetails.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Code"
                name="codePhone"
                onChange={handleUserDetails}
                value={userDetails.codePhone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={6}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleUserDetails}
                type="number"
                value={userDetails.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleUserDetails}
                required
                value={userDetails.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  handleUserDetails: PropTypes.func,
  userDetails: PropTypes.object
};

export default ProfileDetails;
