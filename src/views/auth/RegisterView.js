import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles, Select, MenuItem, InputLabel, FormControl
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup, signupReset } from '../../store/actions';
import Notification from '../../components/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  notification: {
    marginTop: '20px'
  }
}));

const RegisterView = ({
  isAuth, error, signUp, signUpReset
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      signUpReset();
    }
  }, []);

  return (
    <Page
      className={classes.root}
      title="Register"
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
              firstName: '',
              lastName: '',
              password: '',
              type: 'CLIENT',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(value, { setSubmitting }) => {
              const userInfo = {
                email: value.email,
                firstName: value.firstName,
                lastName: value.lastName,
                // FIXME: This should be encrypted
                password: value.password,
                userType: value.type
              };

              signUp(userInfo);

              if (isAuth) {
                navigate('/app/dashboard', { replace: true });
              }

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
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
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
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                    >
                      Sign in
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
      </Box>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.loggedIn,
    error: state.auth.errorSignup,
  };
};

// eslint-disable-next-line react-redux/mapDispatchToProps-prefer-shorthand
const mapDispatchToProps = (dispatch) => ({
  signUp: (userInfo) => dispatch(signup(userInfo)),
  signUpReset: () => dispatch(signupReset())
});

RegisterView.propTypes = {
  isAuth: PropTypes.bool,
  signUp: PropTypes.func,
  signUpReset: PropTypes.func,
  error: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
