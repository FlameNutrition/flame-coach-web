import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
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
  user, enablePhoto, updatePhotoHandler, className, ...rest
}) => {
  const classes = useStyles();

  const dateFormat = 'MMMM Do YYYY, h:mm:ss a';
  const [localTime, setLocalTime] = useState(moment().format(dateFormat));

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      setLocalTime(moment().format(dateFormat));
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
          <Divider />
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
        : null }
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
