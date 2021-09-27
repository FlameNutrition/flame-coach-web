import React, { useState } from "react";
import { Send as SendIcon, UserMinus as UserMinusIcon } from "react-feather";
import {
  enrollmentProcessBreak,
  getClientsCoachPlusClientsAvailableForCoaching
} from "../../api/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import ErrorMessage from "../../components/Core/Notification/ErrorMessage/ErrorMessage";
import Notification from "../../components/Core/Notification";
import Page from "../../components/Page";
import PropTypes from "prop-types";
import { logError } from "../../logging";
import update from "immutability-helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useInviteClient } from "../../api/client/useInviteClient";
import InfoMessage from "../../components/Core/Notification/InfoMessage/InfoMessage";
import clsx from "clsx";
import { useIsMediumMobile } from "../../utils/mediaUtil";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Table from "../../components/Table";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: "100%"
  },
  sendCard: {
    display: "flex"
  },
  sendInviteButton: {
    marginLeft: "5px",
    marginTop: "16px",
    height: "56px",
    backgroundColor: theme.palette.button.success
  },
  minusUserButton: {
    backgroundColor: theme.palette.button.dangerous
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
  },
  container: {
    height: "100%"
  }
}));

const validationSchema = Yup
  .object({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required")
  });

const CustomersView = ({ customerIdentifier }) => {
  const classes = useStyles();
  const isMobile = useIsMediumMobile();

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    tableBodyMaxHeight: "70vh",
    sortOrder: {
      name: "Name",
      direction: "asc"
    },
    print: false
  };
  const [notification, setNotification] = useState({
    enable: false,
    message: "",
    level: "INFO"
  });

  const queryClient = useQueryClient();

  const [clientLoading, setClientLoading] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(null);

  const { mutate: inviteClient } = useInviteClient();

  const resetNotificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const updateNotificationHandler = (enable, message, level) => {
    setNotification({
      enable,
      message,
      level
    });
  };

  const formikSendInviteClient = useFormik({
    initialValues: {
      email: ""
    },

    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      inviteClient({
        coachIdentifier: customerIdentifier,
        clientEmail: values.email
      }, {
        onError: (error) => {
          logError("Customer",
            "useMutation inviteClient",
            "Error:", error.response);

          logError("Customer", "useMutation inviteClient", "Error Details:", error.response.data.detail);
          const errorCode = ErrorMessage.fromCode(error.response.data.code);
          updateNotificationHandler(true, errorCode.msg, errorCode.level);
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["getClientsCoachPlusClientsAvailableForCoaching", customerIdentifier]);

          const successMessage = data.registrationInvite ? InfoMessage.CODE_0004
            : InfoMessage.CODE_0003;

          updateNotificationHandler(true, successMessage.msg, successMessage.level);
        }
      });
    }
  });

  const {
    isError,
    isLoading,
    data
  } = useQuery(["getClientsCoachPlusClientsAvailableForCoaching", customerIdentifier],
    () => getClientsCoachPlusClientsAvailableForCoaching(customerIdentifier), {
      onError: async (err) => {
        logError("Customer",
          "useQuery getClientsCoachPlusClientsAvailableForCoaching",
          "Error:", err);
      },
      select: (data) => {
        const filteredClients = data.clientsCoach.filter((client) => client.status === "PENDING"
          || client.status === "ACCEPTED");

        return {
          identifier: data.identifier,
          clientsCoach: filteredClients
        };
      }
    });

  const unlinkClient = useMutation(
    ({
      clientIdentifier,
      // eslint-disable-next-line no-unused-vars
      coachIdentifier
    }) => enrollmentProcessBreak(clientIdentifier),
    {
      onMutate: async ({ clientIdentifier }) => {
        setClientLoading(clientIdentifier);
        setIsClientLoading(true);
        resetNotificationHandler();
      },
      onError: async (error) => {
        logError("Customer",
          "useMutation enrollmentProcessBreak",
          "Error:", error.response);
        setIsClientLoading(false);

        logError("Customer", "useMutation enrollmentProcessBreak", "Error Details:", error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(["getClientsCoachPlusClientsAvailableForCoaching", variables.coachIdentifier]);

        queryClient.setQueryData(["getClientsCoachPlusClientsAvailableForCoaching", customerIdentifier], (oldData) => {
          const index = oldData.clientsCoach.findIndex(
            (customer) => customer.identifier === variables.clientIdentifier
          );

          return update(oldData, {
            clientsCoach: {
              [index]: {
                status: { $set: data.status }
              }
            }
          });
        });

        setIsClientLoading(false);
      }
    }
  );

  const unlinkClientHandler = (client) => {
    unlinkClient.mutate({
      clientIdentifier: client.identifier,
      coachIdentifier: customerIdentifier
    });
  };

  const getStatus = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "Available";
      case "PENDING":
        return "Pending";
      case "ACCEPTED":
        return "My client";
      default:
        return "Unknown";
    }
  };

  const columnActions = {
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
        const disableButtonMinus = value.client.identifier === value.clientLoading
          ? value.isClientLoading || !(value.client.status !== "AVAILABLE")
          : !(value.client.status !== "AVAILABLE");

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
                className={classes.minusUserButton}
                variant="contained"
                disabled={disableButtonMinus}
                onClick={() => unlinkClientHandler(value.client)}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                >
                  <UserMinusIcon />
                </SvgIcon>
              </Button>
            </Grid>
          </Grid>
        );
      }
    }
  };

  const columns = ["Name", "Email", "Registration date", "Status", columnActions];

  return (
    <Page
      title="Customers"
      isError={isError}
      isLoading={isLoading}>
      <Grid
        direction="row"
        container
      >
        <Grid item xs={12}>
          <Box marginBottom={2}>
            <form onSubmit={formikSendInviteClient.handleSubmit}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Send Invite
                  </Typography>
                  <Box className={classes.sendCard}>
                    <TextField
                      error={Boolean(formikSendInviteClient.errors.email)}
                      fullWidth
                      helperText={formikSendInviteClient.errors.email}
                      label="Email"
                      margin="normal"
                      name="email"
                      onBlur={formikSendInviteClient.handleBlur}
                      onChange={formikSendInviteClient.handleChange}
                      value={formikSendInviteClient.values.email}
                      variant="outlined"
                    />
                    <Button
                      className={classes.sendInviteButton}
                      variant="contained"
                      type="submit"
                    >
                      <SvgIcon
                        fontSize="small"
                        color="inherit"
                      >
                        <SendIcon />
                      </SvgIcon>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            title="Clients List"
            data={data ? data.clientsCoach.map((client) => ([
              `${client.firstname} ${client.lastname}`,
              client.email,
              client.registrationDate,
              getStatus(client.status),
              {
                client,
                clientLoading,
                isClientLoading
              }
            ])) : null}
            columns={columns}
            options={options}
            themeTable={outerTheme => outerTheme}
          />
        </Grid>
        {notification.enable
          ? (
            <Grid item xs={12}>
              <Notification
                collapse
                open={notification.enable}
                openHandler={resetNotificationHandler}
                level={notification.level}
                message={notification.message}
              />
            </Grid>
          )
          : null}
      </Grid>
    </Page>
  );
};

CustomersView.propTypes = {
  customerIdentifier: PropTypes.string
};

export default CustomersView;
