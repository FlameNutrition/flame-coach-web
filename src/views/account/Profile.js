import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({
  user,
  enablePhoto,
  updatePhotoHandler,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const dateFormat = 'MMMM Do YYYY, h:mm:ss a';
  const [localTime, setLocalTime] = useState(moment()
    .format(dateFormat));

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      setLocalTime(moment()
        .format(dateFormat));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          textAlign="center"
        >
          {enablePhoto ? (
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />
          ) : null}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {
              user.country && user.country !== 'Country'
                ? `${localTime} - ${user.city} ${user.country}`
                : `${localTime}`
            }
          </Typography>
        </Box>
      </CardContent>
      {enablePhoto ? (
          <>
            <Divider/>
            <CardActions>
              <Button
                fullWidth
                color="primary"
                variant="text"
                onClick={() => updatePhotoHandler()}
              >
                Upload picture
              </Button>
            </CardActions>
          </>
        )
        : null}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  enablePhoto: PropTypes.bool,
  updatePhotoHandler: PropTypes.func.isRequired
};

Profile.defaultProps = {
  enablePhoto: false
};

export default Profile;
