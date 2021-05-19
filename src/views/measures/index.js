import {
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import React, { useState } from 'react';

import Page from '../../components/Page';
import WeightChart from '../../components/Charts/Weight';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  weightGraphicTitle: {
    textAlign: 'center'
  }
}));

const MeasuresView = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery('(max-width:600px)');

  const [timeFrameWeight, setTimeFrameWeight] = useState('1_WEEK');

  const weights = () => {
    const data = [
      {
        date: '2017-01-10',
        value: 90.5
      },
      {
        date: '2018-01-10',
        value: 60.5
      },
      {
        date: '2019-01-10',
        value: 50.5
      },
      {
        date: '2020-01-10',
        value: 76.3
      },
      {
        date: '2021-01-10',
        value: 76.3
      },
      {
        date: '2021-01-20',
        value: 76.3
      },
      {
        date: '2021-02-10',
        value: 76.3
      },
      {
        date: '2021-03-10',
        value: 70.3
      },
      {
        date: '2021-04-10',
        value: 73.3
      },
      {
        date: '2021-05-01',
        value: 75.3
      },
      {
        date: '2021-05-10',
        value: 74.3
      },
      {
        date: '2021-05-16',
        value: 76.3
      },
      {
        date: '2021-05-18',
        value: 80.3
      }];

    return data;
  };

  return (
    <Page
      className={classes.root}
      title="Measures"
    >
      <Container
        maxWidth={false}
      >
        <Grid
          container
          spacing={1}
          direction="row"
        >
          <Grid
            item
            xs={12}
            md={9}
          >

            <Grid
              container
              spacing={1}
              direction="column"
            >
              <Grid
                item
                xs={12}
              >
                <Grid container spacing={1}>
                  <Grid item md={9} xs={12}>
                    <WeightChart
                      classCard={classes.weightCard}
                      isMobile={isMobile}
                      timeFrame={timeFrameWeight}
                      dataChart={weights()}
                    />
                  </Grid>
                  <Grid item md={3} x={12}>
                    Events
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                other
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
          >
            <Card>
              <CardContent>
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
                        value={timeFrameWeight}
                        onChange={(event) => setTimeFrameWeight(event.target.value)}
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default MeasuresView;
