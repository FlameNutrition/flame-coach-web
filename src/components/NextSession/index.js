import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import colors from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import SessionDateIcon from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.lightGreen[600],
    height: 56,
    width: 56
  }
}));

const NextSession = ({
  date,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              NEXT SESSION
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {date || 'N/A'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SessionDateIcon/>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

NextSession.propTypes = {
  date: PropTypes.string
};

export default NextSession;
