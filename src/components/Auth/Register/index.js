import * as Yup from 'yup';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';

import { Formik } from 'formik';
import Notification from '../../Notification';
import Page from '../../Page';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // FIXME: Why gray color doesn't work well?
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  notification: {
    marginTop: '20px',
    marginBottom: '20px'
  }
}));

const useRouterLocationSearch = (query) => {
  const queryParams = query.split('?')[1];
  return new URLSearchParams(queryParams);
};

const Register = ({
  error,
  signUp,
  routerQuery,
  termsConditions
}) => {
  const classes = useStyles();

  const searchParameters = useRouterLocationSearch(routerQuery);

  const registrationKeyQueryParam = searchParameters.get('registrationKey');
  const emailQueryParam = searchParameters.get('email');

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: emailQueryParam || '',
            firstName: '',
            lastName: '',
            password: '',
            type: 'CLIENT',
            policy: true,
            registrationKey: registrationKeyQueryParam || ''
          }}
          validationSchema={
            Yup.object()
              .shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                firstName: Yup.string()
                  .max(255)
                  .required('First name is required'),
                lastName: Yup.string()
                  .max(255)
                  .required('Last name is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required'),
                policy: Yup.boolean()
                  .oneOf([true], 'This field must be checked'),
                registrationKey: Yup.string()
                  .when('type', {
                    is: 'CLIENT',
                    then: Yup.string()
                      .max(255)
                      .required('Registration code is required')
                  })
              })
          }
          onSubmit={(value, { setSubmitting }) => {
            const userInfo = {
              email: value.email,
              firstName: value.firstName,
              lastName: value.lastName,
              password: value.password,
              userType: value.type,
              registrationKey: value.registrationKey
            };

            signUp(userInfo);
            setSubmitting(false);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                  aria-label="Create new account"
                >
                  Create new account
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use your email to create new account
                </Typography>
              </Box>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Who I am:</InputLabel>
                <Select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Who I am"
                  value={values.type}
                  name="type"
                >
                  <MenuItem value="CLIENT">I am a client</MenuItem>
                  <MenuItem value="COACH">I am a coach</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last name"
                margin="normal"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email address"
                margin="normal"
                disabled={Boolean(emailQueryParam)}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              {
                values.type === 'CLIENT'
                  ? (
                    <TextField
                      error={Boolean(touched.registrationKey && errors.registrationKey)}
                      fullWidth
                      helperText={touched.registrationKey && errors.registrationKey}
                      label="Registration code"
                      margin="normal"
                      disabled={Boolean(registrationKeyQueryParam)}
                      name="registrationKey"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.registrationKey}
                      variant="outlined"
                    />
                  ) : null
              }
              {
                termsConditions
                  ? (
                    <Box
                      alignItems="center"
                      display="flex"
                      ml={-1}
                    >
                      <Checkbox
                        checked={values.policy}
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography
                        color="textSecondary"
                        variant="body1"
                      >
                        I have read the
                        {' '}
                        <Link
                          color="primary"
                          href="#"
                          underline="always"
                          variant="h6"
                        >
                          <a>Terms and Conditions</a>
                        </Link>
                      </Typography>
                    </Box>
                  )
                  : null
              }
              {
                Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )
              }
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
              </Box>
              <Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    href="/login"
                    variant="h6"
                  >
                    <a>Sign in</a>
                  </Link>
                </Typography>
              </Box>
              <Box className={classes.notification}>
                {error
                  ? (
                    <Notification
                      level={error.level}
                      message={error.message}
                    />
                  )
                  : null}
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

Register.propTypes = {
  termsConditions: PropTypes.bool,
  routerQuery: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
  error: PropTypes.object
};

Register.defaultProps = {
  termsConditions: false,
};

export default Register;
