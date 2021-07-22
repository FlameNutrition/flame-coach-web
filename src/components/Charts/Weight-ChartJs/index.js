import {
  minMaxWeight, formatDateLabels, maxTicksLimit
} from '../utils/chartUtil';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { getTimeRange } from '../../../utils/timeRangeUtil';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {},
  weightGraphicTitle: {
    textAlign: 'center'
  }
}));

const WeightChart = ({
  isMobile,
  timeFrame,
  dataChart,
  measureUnit,
  className
}) => {
  const classes = useStyles();

  const minMaxWeightInfo = minMaxWeight(dataChart);

  const dataFormatted = dataChart.map((data) => ({
    y: data.value,
    x: moment(data.date)
      .format('MM-DD')
  }));

  const data = {
    labels: formatDateLabels(getTimeRange(timeFrame, moment()
      .utc())),
    datasets: [
      {
        data: dataFormatted,
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
    // responsive: true,
    // maintainAspectRatio: true,
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

            return `${label} ${measureUnit}`;
          }
        }
      }
    }
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={className}>
        <Typography className={classes.weightGraphicTitle} component="h2" variant="h5" gutterBottom>
          Weight
        </Typography>
        <Line data={data} options={options} type="line"/>
      </CardContent>
    </Card>
  );
};

WeightChart.propTypes = {
  className: PropTypes.string,
  timeFrame: PropTypes.string.isRequired,
  dataChart: PropTypes.array.isRequired,
  measureUnit: PropTypes.string.isRequired,
  isMobile: PropTypes.bool
};

WeightChart.defaultProps = {
  isMobile: false
};

export default WeightChart;
