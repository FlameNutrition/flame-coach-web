import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import Notification from '../../Core/Notification';
import Page from '../../Page';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    // FIXME: Why gray color doesn't work well?
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  notification: {
    marginTop: '20px'
  }
}));

const Login = ({
  error,
  signIn
}) => {
  const classes = useStyles();

  const handlerSubmitting = async (value, { setSubmitting }) => {
    await signIn(value.email, value.password);
    setSubmitting(false);
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object()
              .shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required')
              })}
            onSubmit={handlerSubmitting}
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
              <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}>
                <Box mb={3}>
                  <Typography
                    aria-label="Sign in"
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Start your day, as a flame
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    href="/register"
                    variant="h6"
                  >
                    <a>Sign up</a>
                  </Link>
                </Typography>
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
      </Box>
    </Page>
  );
};

Login.propTypes = {
  error: PropTypes.object,
  signIn: PropTypes.func.isRequired,
};

export default Login;
