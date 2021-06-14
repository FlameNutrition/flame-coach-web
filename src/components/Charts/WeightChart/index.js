import {
  Box, Card, CardContent, makeStyles, Typography
} from '@material-ui/core';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clsx from 'clsx';
import '../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleXYPlot,
  Hint,
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import moment from 'moment';
import { maxTicksLimit, maxTicksLimitMobile, minMaxWeight } from '../utils/chartUtil';
import { getTimeRangeDates } from '../../../utils/timeRangeUtil';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  weightGraphicTitle: {
    textAlign: 'center',
    paddingBottom: '10px'
  }
}));

const WeightChart = ({
  isMobile,
  timeFrame,
  className,
  dataChart,
  measureUnit
}) => {
  const classes = useStyles();

  const maxTick = isMobile ? maxTicksLimitMobile(timeFrame) : maxTicksLimit(timeFrame);

  const filterDates = getTimeRangeDates(timeFrame, moment());

  const minMaxWeightRange = minMaxWeight(dataChart);

  const dataFormatted = dataChart.map((data) => ({
    y: data.value,
    x: moment(data.date, 'YYYY-MM-DD')
  }));

  const fromDttm = moment(filterDates.fromDttm, 'YYYY-MM-DD');
  const toDttm = moment(filterDates.toDttm, 'YYYY-MM-DD');

  const minWeight = minMaxWeightRange.minWeight - 10;
  const maxWeight = minMaxWeightRange.maxWeight + 10;

  const [value, setValue] = useState();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={className}>
        <Typography className={classes.weightGraphicTitle} component="h2" variant="h5" gutterBottom>
          Weight
        </Typography>
        <Box className={classes.chart}>
          <FlexibleXYPlot
            margin={{
              left: 30,
              right: 30,
              top: 5,
              bottom: isMobile ? 30 : 60
            }}
            xType="time"
            yDomain={[minWeight, maxWeight]}
            xDomain={[fromDttm, toDttm]}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
              tickTotal={maxTick}
              tickSize={0}
              tickPadding={isMobile ? 12 : 10}
              tickFormat={(xValue) => {
                return moment(xValue).format('MM-DD');
              }}
              tickLabelAngle={isMobile ? -45 : 0}
              style={{
                ticks: { paddingLeft: '50px' },
                text: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }
              }}
            />
            <YAxis
              tickSizeOuter={0}
              tickSizeInner={0}
              tickPadding={7}
              style={{
                text: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }
              }}
            />
            <LineMarkSeries
              data={dataFormatted}
              size={3}
              color="#3f51b5"
              fill="#3f51b5"
              onValueMouseOver={(datapoint) => {
                setValue(datapoint);
              }}
              onValueMouseOut={() => setValue(null)}
            />
            {value ? (
              <Hint
                value={value}
                format={(datapoint) => {
                  return [
                    {
                      title: 'Date',
                      value: moment(datapoint.x).format('YYYY-MM-DD')
                    },
                    {
                      title: 'Weight',
                      value: `${datapoint.y} ${measureUnit}`
                    }];
                }}
                style={{ text: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' } }}
              />
            ) : null }
          </FlexibleXYPlot>
        </Box>
      </CardContent>
    </Card>
  );
};

WeightChart.propTypes = {
  className: PropTypes.string,
  timeFrame: PropTypes.string.isRequired,
  dataChart: PropTypes.array.isRequired,
  isMobile: PropTypes.bool,
  measureUnit: PropTypes.string.isRequired
};

WeightChart.defaultProps = {};

export default WeightChart;
