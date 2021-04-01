import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles,
  TextField, Checkbox, FormControlLabel, FormGroup, FormHelperText
} from '@material-ui/core';
import clsx from 'clsx';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import Notification from '../../../components/Notification';
import { logDebug } from '../../../logging';

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
  }
}));

const TaskTool = ({
  task,
  notification,
  notificationCollapseHandler,
  updateNotificationHandler,
  addTasksHandler,
  addMultipleTasksHandler,
  updateTaskHandler,
  selectUpdateTaskHandler
}) => {
  const classes = useStyles();

  const [startDateState, setStartDate] = useState(moment().format(moment.HTML5_FMT.DATE));
  const [endDateState, setEndDate] = useState(moment().format(moment.HTML5_FMT.DATE));

  useEffect(() => {
    // FIXME: This not allow change the date of task.
    if (task) {
      setStartDate(task.date);
      setEndDate(task.date);
    }

    logDebug('TaskTool', 'render', 'task', task, startDateState, endDateState);
  });

  const resetFormValues = (setFieldValue) => {
    setStartDate(moment()
      .utc()
      .format(moment.HTML5_FMT.DATE));
    setEndDate(moment()
      .utc()
      .format(moment.HTML5_FMT.DATE));

    setFieldValue('button', 'ADD', false);
    setFieldValue('taskName', '', false);
    setFieldValue('taskDescription', '', false);
    // FIXME: This doesn't work, find a way to reset the checkbox
    // setFieldValue('multipleDays', false, true);
    setFieldValue('isUpdate', false, false);

    updateNotificationHandler(false, '', '');
    selectUpdateTaskHandler(null);
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
            taskName: task !== null ? task.taskName : '',
            taskDescription: task !== null ? task.taskDescription : '',
            multipleDays: false,
            button: null,
            isUpdate: task !== null,
          }}
          validationSchema={Yup.object()
            .shape({
              taskName: Yup.string()
                .max(255)
                .required('Name is required'),
            })}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            if (values.multipleDays) {
              if (moment(startDateState).isSameOrAfter(moment(endDateState))) {
                updateNotificationHandler(true, 'End date is the same or after the start date.', 'WARNING');
              } else {
                const dailyTask = {
                  name: values.taskName,
                  description: values.taskDescription,
                  date: startDateState,
                  toDate: endDateState
                };

                addMultipleTasksHandler(dailyTask);
              }
            } else if (values.isUpdate) {
              const dailyTask = {
                name: values.taskName,
                description: values.taskDescription,
                date: startDateState
              };

              logDebug('TaskTool', 'update', 'dailyTask', dailyTask);

              updateTaskHandler(dailyTask);
            } else {
              const dailyTask = {
                name: values.taskName,
                description: values.taskDescription,
                date: startDateState
              };

              addTasksHandler(dailyTask);
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
                            disabled={values.isUpdate}
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
                        setStartDate(moment(date)
                          .format(moment.HTML5_FMT.DATE));
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
                        setEndDate(moment(date)
                          .format(moment.HTML5_FMT.DATE));
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
                  <Notification
                    collapse
                    open={notification.enable}
                    openHandler={notificationCollapseHandler}
                    level={notification.level}
                    message={notification.message}
                  />
                )
                : null}

            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

TaskTool.propTypes = {
  task: PropTypes.object,
  notification: PropTypes.func.isRequired,
  notificationCollapseHandler: PropTypes.func.isRequired,
  updateNotificationHandler: PropTypes.func.isRequired,
  addTasksHandler: PropTypes.func.isRequired,
  addMultipleTasksHandler: PropTypes.func.isRequired,
  updateTaskHandler: PropTypes.func.isRequired,
  selectUpdateTaskHandler: PropTypes.func.isRequired
};

export default TaskTool;
