import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import BigCalendar from '../../components/BigCalendar';
import FormDialog from '../../components/FormDialog';
import Page from '../../components/Page';
import React from 'react';
import { useFetchAppointmentsCoach } from '../../api/appointments/useFetchAppointmentsCoach';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';

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
  appointments,
  customerIdentifier
}) => {

  const classes = useStyles();

  const [openDialog, setOpenDialog] = React.useState(false);

  const {
    data,
    isFetching,
    isLoading,
    isError
  } = useFetchAppointmentsCoach(customerIdentifier, appointments);

  const cancelDialogHandler = () => {
    setOpenDialog(false);
  };

  const okDialogHandler = () => {
    setOpenDialog(false);
  };

  const clickSlotHandler = (event) => {
    setOpenDialog(true);
    console.log('selectHandler', event);
  };

  const doubleClickSlotHandler = (event) => {
    setOpenDialog(true);
    console.log('selectHandler', event);
  };

  return (
    <Page
      className={classes.root}
      title="Appointments">
      <Container
        className={classes.container}
        maxWidth={false}>
        <Card className={clsx(classes.calendarCard)}>
          <CardHeader
            title="Appointments"
            className={clsx(classes.calendarCardHeader)}
          />
          <Divider/>
          <CardContent className={clsx(classes.calendarCard, classes.calendarCardContent)}>
            <BigCalendar
              events={data}
              localizer={localizer}
              selectSlotHandler={clickSlotHandler}
              doubleClickSlotHandler={doubleClickSlotHandler}
            />
          </CardContent>
        </Card>
        <FormDialog
          dialogTitle="New Appointment"
          dialogDescription="Insert new appointment"
          open={openDialog}
          handleOk={okDialogHandler}
          handleClose={cancelDialogHandler}>
          <>
            <div>form</div>
          </>
        </FormDialog>
      </Container>
    </Page>
  );

};

Appointments.propTypes = {
  appointments: PropTypes.array,
  customerIdentifier: PropTypes.string.isRequired
};

export default Appointments;
