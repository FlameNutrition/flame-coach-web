import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import logger from 'loglevel';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({
  userDetails, enablePersonalData,
  saveUserDetailsHandler, updateUserDetailsHandler, className, ...rest
}) => {
  const classes = useStyles();

  const form = React.createRef();
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    if (form !== null) {
      if (!formReady) {
        const formArray = Array.prototype.slice.call(form.current);

        formArray.forEach((object) => {
          if (object.tagName === 'INPUT') {
            switch (object.name) {
              case 'firstName': {
                object.addEventListener('input', () => {
                  if (object.validity.valueMissing) {
                    object.setCustomValidity('First name is mandatory');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'lastName': {
                object.addEventListener('input', () => {
                  if (object.validity.valueMissing) {
                    object.setCustomValidity('Last name is mandatory');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'email': {
                object.addEventListener('input', () => {
                  if (object.validity.valueMissing) {
                    object.setCustomValidity('Email address is mandatory');
                  } else if (object.validity.typeMismatch) {
                    object.setCustomValidity('Invalid email format');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'codePhone': {
                logger.debug('codePhone', object);
                object.addEventListener('input', () => {
                  if (object.validity.patternMismatch) {
                    object.setCustomValidity('Invalid code phone');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'phone': {
                logger.debug('phone', object);
                object.addEventListener('input', () => {
                  if (object.validity.typeMismatch) {
                    object.setCustomValidity('Invalid phone number');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'country': {
                logger.debug('country', object);
                object.addEventListener('input', () => {
                  if (object.validity.valueMissing) {
                    object.setCustomValidity('Country is mandatory');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'weight': {
                logger.debug('weight', object);
                object.addEventListener('input', () => {
                  if (object.validity.typeMismatch) {
                    object.setCustomValidity('Invalid weight format');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              case 'height': {
                logger.debug('height', object);
                object.addEventListener('input', () => {
                  if (object.validity.typeMismatch) {
                    object.setCustomValidity('Invalid height format');
                  } else {
                    object.setCustomValidity('');
                  }
                });
                break;
              }
              default: {
                logger.warn('Unexpected input object', object);
              }
            }
          }
        });

        setFormReady(true);
      }
    }
  }, []);

  return (
    <form
      ref={form}
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        saveUserDetailsHandler();
      }}
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
                onChange={updateUserDetailsHandler}
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
                onChange={updateUserDetailsHandler}
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
                type="email"
                onChange={updateUserDetailsHandler}
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
                inputProps={{ pattern: '^[+]*[0-9]{1,4}$' }}
                onChange={updateUserDetailsHandler}
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
                onChange={updateUserDetailsHandler}
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
                onChange={updateUserDetailsHandler}
                required
                value={userDetails.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        {enablePersonalData
          ? (
            <>
              <CardHeader
                subheader="Personal data"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={3}
                    xs={12}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Measure Type</InputLabel>
                      <Select
                        onChange={updateUserDetailsHandler}
                        label="Measure Type"
                        name="measure"
                        value={userDetails.measure}
                      >
                        <MenuItem value="kg/cm">Kg/cm</MenuItem>
                        <MenuItem value="lbs/im">Lbs/im</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={4}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      helperText="Please specify your weight"
                      label="Weight"
                      name="weight"
                      type="number"
                      inputProps={{
                        step: 0.05,
                        min: 0
                      }}
                      onChange={updateUserDetailsHandler}
                      value={userDetails.weight}
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
                      helperText="Please specify your height"
                      label="Height"
                      name="height"
                      type="number"
                      inputProps={{
                        step: 0.05,
                        min: 0
                      }}
                      onChange={updateUserDetailsHandler}
                      value={userDetails.height}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={6}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Gender</InputLabel>
                      <Select
                        onChange={updateUserDetailsHandler}
                        label="Gender"
                        name="gender"
                        value={userDetails.gender}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          )
          : null }
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
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
  updateUserDetailsHandler: PropTypes.func.isRequired,
  saveUserDetailsHandler: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  enablePersonalData: PropTypes.bool
};

ProfileDetails.defaultProps = {
  enablePersonalData: false
};

export default ProfileDetails;
