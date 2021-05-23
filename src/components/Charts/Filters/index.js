import {
  Box,
  Button,
  Card,
  CardContent,
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
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {},
  filterSession: {
    marginBottom: theme.spacing(1)
  },
  addSession: {
    marginTop: theme.spacing(2)
  },
}));

const Filters = ({
  timeFrame,
  date,
  onChangeDateHandler,
  weight,
  onChangeWeightHandler,
  onChangeTimeFrameHandler,
  enableAddingWeight,
  onAddWeightHandler,
  className
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={className}>
        <div className={classes.filterSession}>
          <Grid
            container
            spacing={1}
            direction="row"
          >
            <Grid
              item
              xs={12}
            >
              <Typography component="h2" variant="h5" gutterBottom>
                Filters
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControl variant="outlined">
                <InputLabel>Time Frame</InputLabel>
                <Select
                  labelId="time-frame-weight"
                  id="time-frame-weight-select"
                  value={timeFrame}
                  onChange={(event) => onChangeTimeFrameHandler(event.target.value)}
                  label="Time Frame"
                >
                  <MenuItem value="1_WEEK">1 Week</MenuItem>
                  <MenuItem value="1_MONTH">1 Month</MenuItem>
                  <MenuItem value="2_MONTH">2 Month</MenuItem>
                  <MenuItem value="6_MONTH">6 Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {enableAddingWeight
          ? (
            <>
              <Divider variant="fullWidth" />
              <div className={classes.addSession}>
                <Typography component="h2" variant="h5" gutterBottom>
                  Add
                </Typography>
                <TextField
                  fullWidth
                  helperText="Please specify your weight"
                  label="Weight"
                  name="weight"
                  type="number"
                  required
                  inputProps={{
                    step: 0.05,
                    min: 0
                  }}
                  onChange={(event) => {
                    onChangeWeightHandler(Number.isNaN(event.target.valueAsNumber) ? 0.0
                      : event.target.valueAsNumber);
                  }}
                  value={weight}
                />
                <KeyboardDatePicker
                  autoOk
                  fullWidth
                  helperText="Date"
                  margin="dense"
                  format="YYYY/MM/DD"
                  onChange={(newDate) => onChangeDateHandler(newDate)}
                  value={date}
                />
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  m={1}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => onAddWeightHandler(weight, date)}
                  >
                    Add
                  </Button>
                </Box>
              </div>
            </>
          )
          : null }
      </CardContent>
    </Card>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
  timeFrame: PropTypes.string.isRequired,
  date: PropTypes.object,
  onChangeDateHandler: PropTypes.func,
  weight: PropTypes.number,
  onChangeWeightHandler: PropTypes.func,
  onChangeTimeFrameHandler: PropTypes.func.isRequired,
  enableAddingWeight: PropTypes.bool,
  onAddWeightHandler: PropTypes.func
};

Filters.defaultProps = {
  enableAddingWeight: false
};

export default Filters;
