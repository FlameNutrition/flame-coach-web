import PropTypes from "prop-types";
import React, { useState } from "react";
import clsx from "clsx";
import "../../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleXYPlot, Hint, HorizontalBarSeries,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from "react-vis";
import { minMaxValue } from "../utils/chartUtil";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  title: {
    textAlign: "center",
    paddingBottom: "10px"
  }
}));

const IncomeChart = ({
  className,
  currency,
  isMobile,
  dataChart
}) => {
  const classes = useStyles();

  const [value, setValue] = useState();

  const minMaxValueRange = minMaxValue(dataChart);

  const dataFormatted = dataChart.map((data) => ({
    x: isMobile ? data.value : data.month,
    y: isMobile ? data.month : data.value
  }));

  const minValue = minMaxValueRange.minValue;
  const maxValue = minMaxValueRange.maxValue + ((minMaxValueRange.maxValue * 10) / 100);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsRange = [1, 12];

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={className}>
        <Typography className={classes.title} component="h2" variant="h5" gutterBottom>
          Income
        </Typography>
        <Box className={classes.chart}>
          <FlexibleXYPlot
            margin={{
              left: isMobile ? 20 : 70,
              right: isMobile ? 10 : 70,
              top: 5,
              bottom: isMobile ? 30 : 30
            }}
            yDomain={isMobile ? monthsRange : [minValue, maxValue]}
            xDomain={isMobile ? [minValue, maxValue] : monthsRange}
            height={400}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            {isMobile
              ? <XAxis tickFormat={(yValue) => yValue + currency}
                       tickLabelAngle={-40}
                       tickTotal={6} />
              : <XAxis tickValues={months}
                       tickFormat={(xValue) => parseInt(xValue)} />
            }

            {isMobile
              ? <YAxis tickValues={months}
                       tickPadding={0}
                       tickFormat={(yValue) => parseInt(yValue)} />
              : <YAxis tickFormat={(yValue) => yValue + currency} />
            }

            {isMobile
              ? <HorizontalBarSeries data={dataFormatted}
                                     color={"#3f51b5"}
                                     onValueMouseOver={(datapoint) => setValue(datapoint)}
                                     onValueMouseOut={() => setValue(null)} />
              : <VerticalBarSeries data={dataFormatted}
                                   color={"#3f51b5"}
                                   onValueMouseOver={(datapoint) => setValue(datapoint)}
                                   onValueMouseOut={() => setValue(null)} />
            }
            {value ? (
              <Hint
                value={value}
                format={(datapoint) => {
                  return [
                    {
                      title: "Income",
                      value: (isMobile ? datapoint.x : datapoint.y) + currency
                    }];
                }}
                style={{ text: { fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif" } }}
              />
            ) : null}
          </FlexibleXYPlot>
        </Box>
      </CardContent>
    </Card>
  );
};

IncomeChart.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.string,
  dataChart: PropTypes.array,
  isMobile: PropTypes.bool
};

IncomeChart.defaultProps = {
  currency: "£",
  dataChart: [],
  isMobile: false
};

export default IncomeChart;
