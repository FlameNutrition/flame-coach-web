import * as yup from 'yup';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Form, Formik } from 'formik';

import Notification from '../../components/Notification';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const validationSchema = yup.object({
  oldPassword: yup.string('Enter your previous password')
    .required('Previous password is required'),
  newPassword: yup.string('Enter your new password')
    .required('New password is required'),
  newPasswordConfirmation: yup.string('Enter your new password')
    .required('New password is required')
});

const useStyles = makeStyles(({
  root: {},
  notification: {
    margin: '0px !important',
    padding: '10px'
  },
  updateBtnNotification: {
    margin: '15px 15px 0px 15px'
  },
  updateBtn: {
    margin: '15px'
  }
}));

const Password = ({
  notification, updateNotificationHandler, updatePasswordHandler
}) => {
  const classes = useStyles();

  const handleSubmit = async (values, { setSubmitting }) => {
    updatePasswordHandler(values.oldPassword, values.newPassword, values.newPasswordConfirmation);
    setSubmitting(false);
  };

  return (
    <Formik
      className={clsx(classes.root)}
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleChange,
        isSubmitting,
        touched,
        values
      }) => (
        <Form>
          <Card>
            <CardHeader
              subheader="Update password"
              title="Password"
            />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label="Previous Password"
                margin="normal"
                name="oldPassword"
                onChange={handleChange}
                type="password"
                value={values.oldPassword}
                variant="outlined"
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="newPassword"
                onChange={handleChange}
                type="password"
                value={values.newPassword}
                variant="outlined"
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                name="newPasswordConfirmation"
                onChange={handleChange}
                type="password"
                value={values.newPasswordConfirmation}
                variant="outlined"
                error={touched.newPasswordConfirmation
              && Boolean(errors.newPasswordConfirmation)}
                helperText={touched.newPasswordConfirmation && errors.newPasswordConfirmation}
              />
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              className={notification.enable ? classes.updateBtnNotification : classes.updateBtn}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Update
              </Button>
            </Box>
            {notification.enable
              ? (
                <Notification
                  className={classes.notification}
                  collapse
                  open={notification.enable}
                  openHandler={updateNotificationHandler}
                  level={notification.level}
                  message={notification.message}
                />
              ) : null}
          </Card>
        </Form>
      )}
    </Formik>
  );
};

Password.propTypes = {
  notification: PropTypes.object.isRequired,
  updateNotificationHandler: PropTypes.func.isRequired,
  updatePasswordHandler: PropTypes.func.isRequired
};

export default Password;
