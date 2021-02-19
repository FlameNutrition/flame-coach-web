import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import update from 'immutability-helper';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles,
  TextField, Checkbox, FormControlLabel, FormGroup, FormHelperText
} from '@material-ui/core';
import clsx from 'clsx';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionButtons: {
    marginTop: '20px',
  },
  multipleDaysHelper: {
    marginLeft: '14px'
  },
  addButton: {
    backgroundColor: theme.palette.button.success
  },
  updateButton: {
    backgroundColor: theme.palette.button.warning
  },
  resetButton: {
    backgroundColor: theme.palette.button.dangerous
  },
  notificationBar: {
    marginTop: '10px'
  }
}));

const TaskTool = ({ task }) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const NOTIFICATION_ERROR = 'error';
  // eslint-disable-next-line no-unused-vars
  const NOTIFICATION_WARNING = 'warning';
  const NOTIFICATION_INFO = 'info';
  // eslint-disable-next-line no-unused-vars
  const NOTIFICATION_SUCCESS = 'success';

  const [startDateState, setStartDate] = useState(moment().utc().format(moment.HTML5_FMT.DATE));
  const [endDateState, setEndDate] = useState(moment().utc().format(moment.HTML5_FMT.DATE));

  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: NOTIFICATION_INFO
  });

  const resetFormValues = (setFieldValue) => {
    setStartDate(moment().utc().format(moment.HTML5_FMT.DATE));
    setEndDate(moment().utc().format(moment.HTML5_FMT.DATE));

    setFieldValue('button', 'ADD', false);
    setFieldValue('taskName', '', false);
    setFieldValue('taskDescription', '', false);
    // FIXME: This doesn't work, find a way to reset the checkbox
    // setFieldValue('multipleDays', false, true);
    setFieldValue('isUpdate', false, false);

    setNotification(update(notification, { enable: { $set: false } }));
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader
        title="Planner Daily Tasks"
      />
      <Divider />
      <CardContent>
        <Formik
          // FIXME: Please remote the init values
          initialValues={{
            taskName: task !== null ? task.taskTitle : '',
            taskDescription: task !== null ? task.taskDescription : '',
            multipleDays: false,
            button: null,
            isUpdate: task !== null,
          }}
          validationSchema={Yup.object().shape({
            taskName: Yup.string().max(255).required('Name is required'),
          })}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            if (values.multipleDays) {
              const startDate = moment(startDateState, moment.HTML5_FMT.DATE);
              const endDate = moment(endDateState, moment.HTML5_FMT.DATE);

              if (startDate.isSameOrAfter(endDate)) {
                setNotification(update(notification,
                  {
                    enable: { $set: true },
                    message: { $set: 'End date is the same or after the start date.' },
                    level: { $set: NOTIFICATION_ERROR }
                  }));
              }
            } else if (values.isUpdate) {
              console.log('Update task');
            } else {
              console.log('Insert new task');
            }

            setSubmitting(false);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Grid
                  container
                  spacing={1}
                >
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(touched.taskName && errors.taskName)}
                      fullWidth
                      helperText={touched.taskName && errors.taskName}
                      label="Task Name"
                      margin="dense"
                      name="taskName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.taskName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      helperText="A simple task description"
                      label="Task Description"
                      margin="dense"
                      name="taskDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.taskDescription}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={12} md={3}>
                    <FormGroup row>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            name="multipleDays"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.multipleDays}
                          />
                        )}
                        labelPlacement="start"
                        label="Multiple Days"
                      />
                      <FormHelperText className={classes.multipleDaysHelper}>
                        Enable this to add this task into multiple days
                      </FormHelperText>
                    </FormGroup>
                  </Grid>
                  <Grid item sm={12} md={3}>
                    <KeyboardDatePicker
                      autoOk
                      helperText="Start Date"
                      margin="dense"
                      format="YYYY/MM/DD"
                      onChange={(date) => {
                        setStartDate(date.format(moment.HTML5_FMT.DATE));
                      }}
                      value={startDateState}
                      inputVariant="outlined"
                      variant="inline"
                    />
                  </Grid>
                  <Grid item sm={12} md={3}>
                    <KeyboardDatePicker
                      autoOk
                      disabled={!values.multipleDays}
                      helperText="End Date"
                      margin="dense"
                      format="YYYY/MM/DD"
                      onChange={(date) => {
                        setEndDate(date.format(moment.HTML5_FMT.DATE));
                      }}
                      value={endDateState}
                      inputVariant="outlined"
                      variant="inline"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                className={clsx(classes.actionButtons)}
              >
                <Grid
                  container
                  justify="flex-end"
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      className={classes.addButton}
                      fullWidth
                      disabled={values.isUpdate}
                      size="large"
                      onClick={() => {
                        setFieldValue('button', 'ADD', false);
                        handleSubmit();
                      }}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.updateButton}
                      color="inherit"
                      fullWidth
                      disabled={!values.isUpdate}
                      size="large"
                      onClick={() => {
                        setFieldValue('button', 'UPDATE', false);
                        handleSubmit();
                      }}
                      variant="contained"
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.resetButton}
                      color="inherit"
                      fullWidth
                      size="large"
                      onClick={() => {
                        resetFormValues(setFieldValue);
                      }}
                      variant="contained"
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {notification.enable
                ? (
                  <Box className={classes.notificationBar}>
                    <Alert
                      variant="filled"
                      severity={notification.level}
                    >
                      {notification.message}
                    </Alert>
                  </Box>
                ) : null}

            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

TaskTool.propTypes = {
  task: PropTypes.object
};

export default TaskTool;
