import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  BookOpen as PlannerIcon,
  Calendar as CalendarIcon,
  Heart as MeasuresIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { PeopleOutline as CoachIcon, PermIdentity as ClientIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import NavBarBox from '../../../components/NavBarBox';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { isEnable, isWhitelist, MEASURES } from '../../../utils/toggles';

const itemsCoach = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    featureName: 'DASHBOARD'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers',
    featureName: 'CUSTOMERS'
  },
  {
    href: '/app/planner',
    icon: CalendarIcon,
    title: 'Planner',
    featureName: 'PLANNER'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    featureName: 'ACCOUNT'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    featureName: 'SETTING'
  },
  {
    href: '/app/logout',
    icon: LogOutIcon,
    title: 'Logout',
    featureName: 'LOGOUT'
  },
];

const itemsClient = [
  {
    href: '/app/dashboard',
    icon: PlannerIcon,
    title: 'My Planner',
    featureName: 'DASHBOARD'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    featureName: 'ACCOUNT'
  },
  {
    href: '/app/measures',
    icon: MeasuresIcon,
    title: 'Measures',
    featureName: MEASURES
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    featureName: 'SETTINGS'
  },
  {
    href: '/app/logout',
    icon: LogOutIcon,
    title: 'Logout',
    featureName: 'LOGOUT'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    marginBottom: '10px'
  }
}));

const NavBar = ({
  userType,
  firstName,
  lastName,
  isWhiteListFl,
  onMobileClose,
  openMobile
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          to="/app/account"
        >
          {userType === 'CLIENT' ? <ClientIcon /> : <CoachIcon />}
        </Avatar>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {firstName}
          {' '}
          {lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Account Type:
          {' '}
          {userType === 'CLIENT' ? 'Client' : 'Coach'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {userType === 'COACH'
            ? itemsCoach.map((item) => {
              if (isEnable(item.featureName) || isWhiteListFl) {
                return (
                  <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                );
              }
              return null;
            }) : itemsClient.map((item) => {
              if (isEnable(item.featureName) || isWhiteListFl) {
                return (
                  <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                );
              }
              return null;
            })}
        </List>
      </Box>
      <Box flexGrow={1} />
      <NavBarBox
        title=""
        message="Help to improve this app!"
        iconEnable
        icon={(
          <img
            alt="BuyMeACoffee"
            src="/static/icons/coffee.png"
          />
        )}
        btnEnable
        btnLabel="Buy me a coffee"
        btnHref={`${process.env.REACT_APP_BUY_ME_A_COFFEE}`}
      />
      <NavBarBox
        title="Having issues?"
        message="Please report any issue you find. Help us to help you!"
        iconEnable
        icon={(
          <img
            alt="ReportIssue"
            src="/static/icons/issue.png"
          />
        )}
        btnEnable
        btnLabel="Report"
        btnHref={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
      />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  userType: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isWhiteListFl: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false,
  isWhiteListFl: true
};

const mapStateToProps = (state) => {
  return {
    userType: state.auth.userInfo !== null ? state.auth.userInfo.type : null,
    firstName: state.auth.userInfo !== null ? state.auth.userInfo.firstname : null,
    lastName: state.auth.userInfo !== null ? state.auth.userInfo.lastname : null,
    isWhiteListFl: state.auth.userInfo !== null ? isWhitelist(state.auth.userInfo.identifier) : true
  };
};

export { NavBar, mapStateToProps };
