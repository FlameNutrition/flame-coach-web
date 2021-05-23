import {
  Card, CardContent, makeStyles, Paper, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import Event from './Event';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
  },
  eventsCardTitle: {
    textAlign: 'center',
    paddingBottom: '5px'
  },
  complexSwipeableListContainer: {
    width: '100%',
    height: '90%',
    overflowY: 'scroll'
  },
  complexSwipeableListItemContentLeft: {
    backgroundColor: 'red',
    color: 'white',
    flex: 1,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },
  complexSwipeableListItemContentLeftText: {
    paddingLeft: '10px'
  }
}));

const Events = ({
  dataEvents,
  onDeleteHandle,
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
          <SwipeableList threshold={0.70}>
            {dataEvents.reverse().map((event) => {
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
                  <Event date={event.date} value={event.value} />
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
  onDeleteHandle: PropTypes.func.isRequired
};

Events.defaultProps = {
};

export default Events;
