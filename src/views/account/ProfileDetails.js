import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import { Controller, useForm } from 'react-hook-form';

import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import countries from '../../data/countryCode';
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
  className
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
          >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
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
                      inputRef={formContactInformation.register({
                        required: false,
                        pattern: '^[+]*[0-9]{1,4}$'
                      })}
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
                        render={(renderProps) => (
                          <Select
                            key="select_country"
                            labelId="country"
                            label="Country"
                            name="country"
                            data-testid="country"
                            value={userDetails.country}
                            onChange={(event) => {
                              renderProps.onChange(updateUserDetailsHandler(event));
                            }}
                          >
                            <MenuItem key="default" value="">Country</MenuItem>
                            {
                              countries.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                  {country.name}
                                </MenuItem>
                              ))
                            }
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
              <Divider/>
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
                    name="contactInfo-save"
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
              >
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
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
                            render={(renderProps) => (
                              <Select
                                labelId="measureType"
                                label="Measure Type"
                                name="measureType"
                                value={userDetails.measureType}
                                onChange={(event) => {
                                  renderProps.onChange(updateUserDetailsHandler(event));
                                }}
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
                            render={(renderProps) => (
                              <Select
                                labelId="gender"
                                label="Gender"
                                name="gender"
                                value={userDetails.gender}
                                onChange={(event) => {
                                  renderProps.onChange(updateUserDetailsHandler(event));
                                }}
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
                  <Divider/>
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
                        name="personalInfo-save"
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
  savePersonalInformationHandler: PropTypes.func,
  userDetails: PropTypes.object.isRequired,
  enablePersonalData: PropTypes.bool
};

ProfileDetails.defaultProps = {
  enablePersonalData: false
};

export default ProfileDetails;
