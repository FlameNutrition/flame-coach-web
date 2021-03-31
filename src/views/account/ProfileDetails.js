import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Controller, useForm } from 'react-hook-form';
import { logDebug } from '../../logging';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({
  userDetails,
  enablePersonalData,
  saveContactInformationHandler,
  savePersonalInformationHandler,
  updateUserDetailsHandler,
  className,
  ...rest
}) => {
  const classes = useStyles();

  logDebug('ProfileDetails', 'render', 'userDetails', userDetails);

  const formContactInformation = useForm();
  const formPersonalInformation = useForm();

  return (
    <Box component="div">
      <Card>
        <CardContent>
          <CardHeader
            title="Profile"
            subheader="Use this section to update information related with you"
          />
          <form
            autoComplete="off"
            onSubmit={(event) => {
              event.preventDefault();
              formContactInformation.handleSubmit(
                saveContactInformationHandler
              )(event);
            }}
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="contactInfo-content"
                id="contactInfo-header"
              >
                <Typography component="h2">Contact information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="First name"
                      name="firstName"
                      helperText="First name is required"
                      error={Boolean(formContactInformation.errors.firstName)}
                      onChange={updateUserDetailsHandler}
                      inputRef={formContactInformation.register({ required: true })}
                      value={userDetails.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={updateUserDetailsHandler}
                      error={Boolean(formContactInformation.errors.lastName)}
                      inputRef={formContactInformation.register({ required: true })}
                      value={userDetails.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      disabled
                      onChange={updateUserDetailsHandler}
                      value={userDetails.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Code"
                      name="phoneCode"
                      error={Boolean(formContactInformation.errors.phoneCode)}
                      inputRef={formContactInformation.register({ required: false, pattern: '^[+]*[0-9]{1,4}$' })}
                      onChange={updateUserDetailsHandler}
                      value={userDetails.phoneCode}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      inputRef={formContactInformation.register}
                      onChange={updateUserDetailsHandler}
                      type="number"
                      value={userDetails.phoneNumber}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Country</InputLabel>
                      <Controller
                        as={(
                          <Select
                            labelId="country"
                            label="Country"
                            value={userDetails.country}
                            onChange={updateUserDetailsHandler}
                          >
                            <MenuItem value="">Country</MenuItem>
                            <MenuItem value="PT">Portugal</MenuItem>
                            <MenuItem value="BR">Brazil</MenuItem>
                          </Select>
                      )}
                        control={formContactInformation.control}
                        defaultValue={userDetails.country}
                        name="country"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  p={1}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              </AccordionActions>
            </Accordion>
          </form>
          {enablePersonalData
            ? (
              <form
                autoComplete="off"
                onSubmit={(event) => {
                  event.preventDefault();
                  formPersonalInformation.handleSubmit(
                    savePersonalInformationHandler
                  )(event);
                }}
                className={clsx(classes.root, className)}
                {...rest}
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="contactInfo-content"
                    id="contactInfo-header"
                  >
                    <Typography component="h2">Personal information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Measure Type</InputLabel>
                          <Controller
                            as={(
                              <Select
                                labelId="measureType"
                                label="Measure Type"
                                value={userDetails.measureType}
                                onChange={updateUserDetailsHandler}
                              >
                                <MenuItem value="KG_CM">Kg/cm</MenuItem>
                                <MenuItem value="LBS_IN">Lbs/in</MenuItem>
                              </Select>
                          )}
                            control={formPersonalInformation.control}
                            defaultValue={userDetails.measureType}
                            name="measureType"
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Gender</InputLabel>
                          <Controller
                            as={(
                              <Select
                                labelId="gender"
                                label="Gender"
                                value={userDetails.gender}
                                onChange={updateUserDetailsHandler}
                              >
                                <MenuItem value="">Gender</MenuItem>
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                                <MenuItem value="O">Other</MenuItem>
                              </Select>
                          )}
                            control={formPersonalInformation.control}
                            defaultValue={userDetails.gender}
                            name="gender"
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          fullWidth
                          helperText="Please specify your weight"
                          label="Weight"
                          name="weight"
                          type="number"
                          inputProps={{
                            step: 0.05,
                            min: 0
                          }}
                          inputRef={formPersonalInformation.register}
                          onChange={updateUserDetailsHandler}
                          value={userDetails.weight}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <TextField
                          fullWidth
                          helperText="Please specify your height"
                          label="Height"
                          name="height"
                          type="number"
                          inputProps={{
                            step: 0.05,
                            min: 0
                          }}
                          inputRef={formPersonalInformation.register}
                          onChange={updateUserDetailsHandler}
                          value={userDetails.height}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                  <Divider />
                  <AccordionActions>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      p={2}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Box>
                  </AccordionActions>
                </Accordion>
              </form>
            )
            : null}
        </CardContent>
      </Card>
    </Box>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  updateUserDetailsHandler: PropTypes.func.isRequired,
  saveContactInformationHandler: PropTypes.func.isRequired,
  savePersonalInformationHandler: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  enablePersonalData: PropTypes.bool
};

ProfileDetails.defaultProps = {
  enablePersonalData: false
};

export default ProfileDetails;
