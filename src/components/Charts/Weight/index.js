import {
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  minMaxWeight, filterWeightsPerTimeRange, formatDateLabels, maxTicksLimit
} from '../utils/chartUtil';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { getTimeRange } from '../../../utils/timeRangeUtil';

const useStyles = makeStyles(() => ({
  weightGraphicTitle: {
    textAlign: 'center'
  }
}));

const WeightChart = ({
  isMobile, timeFrame, dataChart
}) => {
  const classes = useStyles();

  const formattedDataChart = filterWeightsPerTimeRange(dataChart, moment().utc(), timeFrame);

  const minMaxWeightInfo = minMaxWeight(formattedDataChart);

  const data = {
    labels: formatDateLabels(getTimeRange(timeFrame, moment().utc())),
    datasets: [
      {
        data: formattedDataChart,
        fill: false,
        borderWidth: 2,
        backgroundColor: 'rgb(63, 81, 181)',
        borderColor: 'rgba(63, 81, 181, 0.7)',
        parsing: {
          yAxisKey: 'y'
        }
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          minRotation: isMobile ? 40 : 0,
          maxRotation: isMobile ? 90 : 0,
          maxTicksLimit: maxTicksLimit(timeFrame)
        }
      },
      y: {
        beginAtZero: true,
        min: minMaxWeightInfo.minWeight > 10 ? minMaxWeightInfo.minWeight - 10 : 0,
        max: minMaxWeightInfo.maxWeight > 10 ? minMaxWeightInfo.maxWeight + 10 : 0
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label(context) {
            const label = context.formattedValue || '';

            return `${label} Kgs`;
          }
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography className={classes.weightGraphicTitle} component="h2" variant="h5" gutterBottom>
          Weight
        </Typography>
        <Line data={data} options={options} type="line" />
      </CardContent>
    </Card>
  );
};

WeightChart.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  dataChart: PropTypes.array.isRequired,
  isMobile: PropTypes.bool
};

WeightChart.defaultProps = {
  isMobile: false
};

export default WeightChart;
