import React from 'react';
import clsx from 'clsx';
import logger from 'loglevel';
import PropTypes from 'prop-types';
import {
  AppBar, Box, Hidden, IconButton, makeStyles, Toolbar
} from '@material-ui/core';
import { Menu as MenuIcon, Input as InputIcon } from '@material-ui/icons';
import { loggedOut, notification } from '../../../store/actions';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  // FIXME
  // eslint-disable-next-line no-shadow
  notification,
  signOut,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        {
        /**
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        */
        }
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notificationLength.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon onClick={() => notification()} />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit">
            <InputIcon onClick={() => signOut()} />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={() => {
              logger.info('Open the mobile menu');
              onMobileNavOpen();
            }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

// FIXME: Remove this and fix this method
// eslint-disable-next-line react-redux/mapDispatchToProps-prefer-shorthand
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(loggedOut()),
  notification: () => dispatch(notification())
});

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  signOut: PropTypes.func,
  notification: PropTypes.func
};

export { TopBar, mapDispatchToProps };
