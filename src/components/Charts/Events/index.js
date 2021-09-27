import PropTypes from "prop-types";
import React from "react";
import { SwipeableList, SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import Event from "./Event";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  root: {},
  eventsCardTitle: {
    textAlign: "center",
    paddingBottom: "5px"
  },
  complexSwipeableListContainer: {
    width: "100%",
    height: "90%",
    overflowY: "scroll"
  },
  complexSwipeableListItemContentLeft: {
    backgroundColor: "red",
    color: "white",
    flex: 1,
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center"
  },
  complexSwipeableListItemContentLeftText: {
    paddingLeft: "10px"
  }
}));

const Events = ({
  dataEvents,
  onDeleteHandle,
  measureUnit,
  className
}) => {
  const classes = useStyles();

  const swipeableListItemContentLeft = (
    <Paper className={classes.complexSwipeableListItemContentLeft} variant="outlined" square>
      <Typography className={classes.complexSwipeableListItemContentLeftText} variant="body1">
        Delete
      </Typography>
    </Paper>
  );

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={className}>
        <Typography
          className={classes.eventsCardTitle}
          component="h2"
          variant="h5"
          gutterBottom
        >
          Events
        </Typography>

        <div className={classes.complexSwipeableListContainer}>
          <SwipeableList threshold={0.65}>
            {dataEvents.reverse()
              .map((event) => {
                return (
                  <SwipeableListItem
                    key={event.identifier}
                    swipeRight={{
                      content: swipeableListItemContentLeft,
                      action: () => {
                        onDeleteHandle(event);
                      }
                    }}
                  >
                    <Event date={event.date} value={event.value} measureType={measureUnit} />
                  </SwipeableListItem>
                );
              })}
          </SwipeableList>
        </div>
      </CardContent>
    </Card>
  );
};

Events.propTypes = {
  className: PropTypes.string,
  dataEvents: PropTypes.array.isRequired,
  onDeleteHandle: PropTypes.func.isRequired,
  measureUnit: PropTypes.string.isRequired
};

Events.defaultProps = {};

export default Events;
