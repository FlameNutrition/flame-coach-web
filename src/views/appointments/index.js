import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import BigCalendar from '../../components/BigCalendar';
import FormDialog from '../../components/FormDialog';
import React, { useState } from 'react';
import { useFetchAppointmentsCoach } from '../../api/appointments/useFetchAppointmentsCoach';
import { momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment-timezone';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';
import { useAddAppointmentClient } from '../../api/appointments/useAddAppointmentClient';
import SearchClient from '../../components/SearchClient';
import { logDebug, logError, logInfo } from '../../logging';
import { useFetchClientsCoach } from '../../api/client/useFetchClientsCoach';
import Page from '../../components/Page';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getTimezoneDateTime } from '../../utils/timezoneUtil';
import update from 'immutability-helper';
import Notification from '../../components/Core/Notification';
import { useQueryClient } from 'react-query';
import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
import { useEditAppointmentClient } from '../../api/appointments/useEditAppointmentsCoach';
import { useDeleteAppointmentClient } from '../../api/appointments/useDeleteAppointmentsCoach';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    height: '100%'
  },
  calendarCard: {
    height: '100%'
  },
  calendarCardHeader: {},
  calendarCardContent: {
    paddingBottom: '80px !important'
  }
}));

const Appointments = ({
  customerIdentifier
}) => {

  const queryClient = useQueryClient();
  const classes = useStyles();

  const [appointment, setAppointment] = React.useState({
    id: null,
    title: null,
    allDay: false,
    dttmStarts: new Date(),
    dttmEnds: new Date(),
    resource: {
      notes: '',
      price: null,
      clientIdentifier: null
    }
  });

  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [operation, setOperation] = React.useState('ADD');
  const [calendarView, setCalendarView] = React.useState(Views.DAY);

  React.useEffect(() => {
    setNotification(update(notification, {
      enable: { $set: false }
    }));
  }, [openDialog]);

  const {
    register,
    handleSubmit
  } = useForm();

  const { mutate: addAppointment } = useAddAppointmentClient();

  const { mutate: editAppointment } = useEditAppointmentClient();

  const { mutate: deleteAppointment } = useDeleteAppointmentClient();

  const {
    data: appointmentsData,
    isFetching: appointmentsIsFetching,
    isError: appointmentsIsError
  } = useFetchAppointmentsCoach(customerIdentifier);

  const clientsCoach = useFetchClientsCoach(customerIdentifier);

  const okDialogHandler = (data, event) => {
    event.preventDefault();
    logInfo('Appointments', 'okDialogHandler', 'value', appointment);

    if (!appointment.title || !appointment.dttmStarts ||
      !appointment.dttmEnds || !appointment.resource?.price ||
      !appointment.resource?.clientIdentifier) {
      setNotification(update(notification,
        {
          enable: { $set: true },
          message: { $set: ErrorMessage.CODE_0009.msg },
          level: { $set: ErrorMessage.CODE_0009.level },
        }));
    } else {

      if (appointment.dttmStarts.isAfter(appointment.dttmEnds)) {
        setNotification(update(notification,
          {
            enable: { $set: true },
            message: { $set: ErrorMessage.CODE_0008.msg },
            level: { $set: ErrorMessage.CODE_0008.level },
          }));
      } else {
        if (operation === 'ADD') {
          addAppointment({
              appointment: appointment,
              clientIdentifier: appointment.resource?.clientIdentifier,
              coachIdentifier: customerIdentifier
            }, {
              onSuccess: () => {
                queryClient.invalidateQueries(['getCoachAppointments', customerIdentifier]);
                setOpenDialog(false);
              },
              onError: (error) => {
                logError('Appointments', 'useMutation addAppointment', 'Error Details:', error.response.data.detail);
                const errorCode = ErrorMessage.fromCode(error.response.data.code);

                setNotification(update(notification,
                  {
                    enable: { $set: true },
                    message: { $set: errorCode.msg },
                    level: { $set: errorCode.level },
                  }));
              }
            }
          );
        }

        if (operation === 'EDIT/DELETE') {
          editAppointment({
              appointmentIdentifier: appointment.id,
              appointment: appointment
            }, {
              onSuccess: () => {
                queryClient.invalidateQueries(['getCoachAppointments', customerIdentifier]);
                setOpenDialog(false);
              },
              onError: (error) => {
                logError('Appointments', 'useMutation editAppointment', 'Error Details:', error.response.data.detail);
                const errorCode = ErrorMessage.fromCode(error.response.data.code);

                setNotification(update(notification,
                  {
                    enable: { $set: true },
                    message: { $set: errorCode.msg },
                    level: { $set: errorCode.level },
                  }));
              }
            }
          );
        }
      }
    }
  };

  const deleteHandler = () => {
    deleteAppointment({
      appointmentIdentifier: appointment.id
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['getCoachAppointments', customerIdentifier]);
        setOpenDialog(false);
      },
      onError: (error) => {
        logError('Appointments', 'useMutation deleteAppointment', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);

        setNotification(update(notification,
          {
            enable: { $set: true },
            message: { $set: errorCode.msg },
            level: { $set: errorCode.level },
          }));
      }
    });
  };

  const doubleClickSlotHandler = (slot) => {
    setOperation('EDIT/DELETE');

    let dateTimeZoneStart;
    let dateTimeZoneEnd;
    let allDay = false;

    //Entire day event
    if (slot?.allDay) {
      dateTimeZoneStart = getTimezoneDateTime(slot.start);
      dateTimeZoneEnd = getTimezoneDateTime(slot.start)
        .add(1, 'days')
        .subtract(1, 'seconds');
      allDay = true;
    } else {
      //Select the first and the last date
      dateTimeZoneStart = getTimezoneDateTime(slot.start);
      dateTimeZoneEnd = getTimezoneDateTime(slot.end);
    }

    setAppointment(update(appointment, {
      id: { $set: slot.id },
      title: { $set: slot.title },
      dttmStarts: { $set: dateTimeZoneStart },
      dttmEnds: { $set: dateTimeZoneEnd },
      allDay: { $set: allDay },
      resource: {
        notes: { $set: slot.resource?.notes },
        price: { $set: slot.resource?.price },
        clientIdentifier: { $set: slot.resource?.clientIdentifier }
      }
    }));

    setOpenDialog(true);
  };

  const selectSlotHandler = (slots) => {
    setOperation('ADD');

    let dateTimeZoneStart;
    let dateTimeZoneEnd;
    let allDay = false;

    //Selected entire day
    if (slots.length === 1) {
      dateTimeZoneStart = getTimezoneDateTime(slots[0]);
      dateTimeZoneEnd = getTimezoneDateTime(slots[0])
        .add(1, 'days')
        .subtract(1, 'seconds');
      allDay = true;
    } else {
      //Select the first and the last date
      dateTimeZoneStart = getTimezoneDateTime(slots[0]);
      dateTimeZoneEnd = getTimezoneDateTime(slots[slots.length - 1]);
    }

    setAppointment(update(appointment, {
      id: { $set: null },
      title: { $set: '' },
      dttmStarts: { $set: dateTimeZoneStart },
      dttmEnds: { $set: dateTimeZoneEnd },
      allDay: { $set: allDay },
      resource: {
        notes: { $set: '' },
        price: { $set: 0.0 },
        clientIdentifier: { $set: null }
      }
    }));

    setOpenDialog(true);
  };

  return (
    <Page
      title={'Appointments'}
      isError={clientsCoach.isError || appointmentsIsError}
      isLoading={clientsCoach.isFetching || appointmentsIsFetching}>
      <Card className={clsx(classes.calendarCard)}>
        <CardHeader
          title="Appointments"
          className={clsx(classes.calendarCardHeader)}
        />
        <Divider/>
        <CardContent className={clsx(classes.calendarCard, classes.calendarCardContent)}>
          <BigCalendar
            view={calendarView}
            events={appointmentsData}
            localizer={localizer}
            doubleClickSlotHandler={doubleClickSlotHandler}
            selectSlotHandler={selectSlotHandler}
            onView={(value) => setCalendarView(value)}
          />
        </CardContent>
      </Card>
      <FormDialog
        submitHandler={handleSubmit}
        dialogTitle={operation === 'ADD' ? 'New Appointment' : 'Edit Appointment'}
        dialogDescription="Please complete the following fields below:"
        open={openDialog}
        deleteHandler={operation === 'EDIT/DELETE' ? deleteHandler : null}
        okHandler={okDialogHandler}
        closeHandler={() => setOpenDialog(false)}>
        <Grid
          container
          spacing={1}
          direction="row">
          <Grid
            item
            xs={12}
            md={12}>
            <SearchClient
              clients={!clientsCoach.isLoading ? clientsCoach?.data.clientsCoach : []}
              clientDefault={appointment.resource?.clientIdentifier}
              disabled={operation === 'EDIT/DELETE'}
              searchSelectedHandler={(newValue) => {
                setAppointment(update(appointment, {
                  title: { $set: newValue ? `${newValue.firstname} ${newValue.lastname}` : '' },
                  resource: {
                    clientIdentifier: { $set: newValue.identifier }
                  }
                }));
              }}
              error={Boolean(!appointment.resource?.clientIdentifier)}
              margin="dense"
              inputRef={register('client')}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <KeyboardDateTimePicker
              autoOk
              fullWidth
              name="dttmStarts"
              label="Starts"
              inputVariant="outlined"
              inputRef={register('dttmStarts')}
              onChange={(newDate) => {
                logDebug('Appointments', 'onChange KeyboardDateTimePicker', 'New Date', newDate);
                setAppointment(update(appointment, {
                  dttmStarts: { $set: newDate },
                }));
              }}
              error={Boolean(!appointment.dttmStarts)}
              value={appointment.dttmStarts}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <KeyboardDateTimePicker
              autoOk
              fullWidth
              name="dttmEnds"
              label="Ends"
              inputVariant="outlined"
              inputRef={register('dttmEnds')}
              onChange={(newDate) => {
                logDebug('Appointments', 'onChange KeyboardDateTimePicker', 'New Date', newDate);
                setAppointment(update(appointment, {
                  dttmEnds: { $set: newDate }
                }));
              }}
              error={Boolean(!appointment.dttmEnds)}
              value={appointment.dttmEnds}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              inputProps={{
                step: 0.05,
                min: 0
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
              onChange={(event) => {
                setAppointment(update(appointment, {
                  resource: {
                    price: { $set: event.target.value }
                  }
                }));
              }}
              value={appointment.resource?.price}
              error={Boolean(!appointment.resource?.price)}
              margin="dense"
              inputRef={register('price')}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              margin="dense"
              inputRef={register('notes')}
              onChange={(event) => {
                setAppointment(update(appointment, {
                  resource: {
                    notes: { $set: event.target.value }
                  }
                }));
              }}
              value={appointment.resource?.notes}
              variant="outlined"
            />
          </Grid>
          {notification.enable
            ? (
              <Grid item xs={12}>
                <Notification
                  collapse
                  open={notification.enable}
                  openHandler={() => setNotification(update(notification,
                    {
                      enable: { $set: false }
                    }))
                  }
                  level={notification.level}
                  message={notification.message}
                />
              </Grid>
            )
            : null}
        </Grid>
      </FormDialog>
    </Page>
  );

};

Appointments.propTypes = {
  customerIdentifier: PropTypes.string.isRequired
};

export default Appointments;
