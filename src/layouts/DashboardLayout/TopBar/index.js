import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';

import { Input as InputIcon, Menu as MenuIcon } from '@material-ui/icons';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

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
  ...rest
}) => {
  const classes = useStyles();

  const router = useRouter();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Box flexGrow={1}/>
        <Hidden mdDown>
          <IconButton color="inherit" onClick={async () => {
            const response = await signOut({
              callbackUrl: `${process.env.NEXTAUTH_URL}/login`,
              redirect: false
            });

            router.replace(response.url);
          }}>
            <InputIcon/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={() => {
              onMobileNavOpen();
            }}
          >
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
