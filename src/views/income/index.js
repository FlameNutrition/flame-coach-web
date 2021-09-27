import { Button, Card, CardContent, makeStyles, SvgIcon } from "@material-ui/core";
import { useFetchAppointmentsCoachWithFilter } from "../../api/appointments/useFetchAppointmentsCoach";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { Check as AcceptIcon, X as RejectIcon } from "react-feather";
import React, { useState } from "react";
import { useIsMediumMobile } from "../../utils/mediaUtil";
import Table from "../../components/Table";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import Page from "../../components/Page";
import PropTypes from "prop-types";
import { defaultTimezone, getDefaultTimezoneDateTime } from "../../utils/timezoneUtil";
import { displayDateWithDash, displayDateWithSlash } from "../../utils/displayDateTimeUtil";
import { useEditAppointmentClient } from "../../api/appointments/useEditAppointmentsCoach";
import { logError } from "../../logging";
import LoadingBox from "../../components/Core/LoadingBox";
import { convertDateToTimezoneInstance } from "../../utils/convertDateTimeUtil";

const useStyles = makeStyles((theme) => ({
  acceptButton: {
    backgroundColor: theme.palette.button.success
  },
  rejectButton: {
    backgroundColor: theme.palette.button.dangerous
  },
  searchButton: {
    backgroundColor: theme.palette.button.neutral
  },
  statusBox: {
    textAlign: "right"
  },
  // Note: this using the following solution: https://github.com/gregnb/mui-datatables/issues/400#issuecomment-681998044
  rightTableHead: {
    "& > div": {
      textAlign: "right",
      paddingRight: "15px"
    }
  },
  actionColumnTable: {
    paddingRight: "12px"
  }
}));

const options = {
  filterType: "dropdown",
  selectableRows: "none",
  tableBodyMaxHeight: "70vh",
  sortOrder: {
    name: "Date",
    direction: "desc"
  },
  responsive: "vertical",
  print: false
};

const IncomeView = ({
  coachIdentifier
}) => {

  const classes = useStyles();
  const isMobile = useIsMediumMobile();

  const [fromDate, setFromDate] = useState(getDefaultTimezoneDateTime(moment.tz()));
  const [toDate, setToDate] = useState(getDefaultTimezoneDateTime(moment.tz()
    .add(1, "month")));

  // region Code with queries to API

  const appointments = useFetchAppointmentsCoachWithFilter(
    coachIdentifier,
    displayDateWithDash(fromDate),
    displayDateWithDash(toDate),
    {
      select: (data) => {
        if (data === undefined || !data.appointments) {
          return [];
        }

        let totalPending = 0;
        let totalAccepted = 0;
        let totalMoney = 0.0;

        const appointmentsTable = data.appointments.map((item) => {
            const date = displayDateWithSlash(moment.tz(item.dttmStarts, defaultTimezone));

            if (item.incomeStatus === "ACCEPTED") {
              totalAccepted++;
              totalMoney = totalMoney + item.price;
            }

            if (item.incomeStatus === "PENDING") {
              totalPending++;
            }

            return [date, `${item.client.firstName} ${item.client.lastName}`, `${item.price} £`, item.incomeStatus, item];
          }
        );

        return {
          appointments: appointmentsTable,
          totalPending: totalPending,
          totalAccepted: totalAccepted,
          totalMoney: totalMoney
        };
      }
    }
  );

  const editAppointment = useEditAppointmentClient();

  // endregion

  // region General methods

  const updateAppointmentStatus = (value, status) => {
    editAppointment.mutate({
        appointmentIdentifier: value.identifier,
        appointment: {
          "dttmStarts": convertDateToTimezoneInstance(value.dttmStarts),
          "dttmEnds": convertDateToTimezoneInstance(value.dttmEnds),
          resource: {
            "price": value.price,
            "notes": value.notes
          },
          "incomeStatus": status
        }
      }, {
        onSuccess: () => {
          appointments.refetch();
        },
        onError: (error) => {
          logError("Appointments", "useMutation editAppointment", "Error Details:", error.response.data.detail);
        }
      }
    );
  };

  const columns = [
    "Date",
    "Appointment",
    "Price",
    "Status",
    {
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        setCellHeaderProps: () => {
          return {
            className: clsx({
              [classes.rightTableHead]: true
            })
          };
        },
        // eslint-disable-next-line react/display-name
        customBodyRender: (value) => {
          return (
            <Grid
              container
              justifyContent={isMobile ? "flex-start" : "flex-end"}
              spacing={1}
              className={clsx({
                [classes.actionColumnTable]: true
              })}
            >
              <Grid item>
                <Button
                  className={classes.acceptButton}
                  variant="contained"
                  disabled={value.incomeStatus === "ACCEPTED"}
                  onClick={() => updateAppointmentStatus(value, "ACCEPTED")}
                >
                  <SvgIcon
                    fontSize="small"
                    color="inherit"
                  >
                    <AcceptIcon />
                  </SvgIcon>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.rejectButton}
                  variant="contained"
                  disabled={value.incomeStatus === "REJECTED"}
                  onClick={() => updateAppointmentStatus(value, "REJECTED")}
                >
                  <SvgIcon
                    fontSize="small"
                    color="inherit"
                  >
                    <RejectIcon />
                  </SvgIcon>
                </Button>
              </Grid>
            </Grid>
          );
        }
      }
    }
  ];

  // endregion

  return (
    <Page
      title="Income"
      isError={appointments.isError}
      isLoading={false}>
      <Grid
        direction="row"
        container
        spacing={1}
      >
        <Grid item xs={12} md={9} lg={9}>
          <LoadingBox isLoading={appointments.isFetching}>
            <Table
              title="Income Status"
              data={appointments.data?.appointments}
              columns={columns}
              options={options}
            />
          </LoadingBox>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Grid
            direction="row"
            container
            spacing={1}
          >
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography component="h2" variant="h5" gutterBottom>
                    Filter
                  </Typography>
                  <Box>
                    <KeyboardDatePicker
                      autoOk
                      allowKeyboardControl={false}
                      fullWidth
                      helperText="from"
                      margin="dense"
                      format="YYYY/MM/DD"
                      value={fromDate}
                      placeholder={displayDateWithSlash(fromDate)}
                      onChange={(date) => {
                        if (date !== null) {
                          setFromDate(date);
                        }
                      }}
                    />
                  </Box>
                  <Box>
                    <KeyboardDatePicker
                      autoOk
                      allowKeyboardControl={false}
                      fullWidth
                      helperText="to"
                      margin="dense"
                      format="YYYY/MM/DD"
                      value={toDate}
                      placeholder={displayDateWithSlash(toDate)}
                      onChange={(date) => {
                        if (date !== null) {
                          setToDate(date);
                        }
                      }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    textAlign="right"
                  >
                    <Box>
                      Income Accepted: {appointments.data?.totalAccepted}
                    </Box>
                    <Box>
                      Income Pending: {appointments.data?.totalPending}
                    </Box>
                    <Typography component="h2" variant="h5" gutterBottom>
                      Total: {appointments.data?.totalMoney}£
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );

};

IncomeView.propTypes = {
  coachIdentifier: PropTypes.string.isRequired
};

export default IncomeView;



