import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  BookOpen as PlannerIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import { connect } from 'react-redux';
import ClientIcon from '@material-ui/icons/PermIdentity';
import CoachIcon from '@material-ui/icons/PeopleOutline';
import SmallBox from '../../../components/SmallBox';
import NavItem from './NavItem';

const itemsCoach = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/planner',
    icon: CalendarIcon,
    title: 'Planner'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/app/logout',
    icon: LogOutIcon,
    title: 'Logout'
  },
];

const itemsClient = [
  {
    href: '/app/dashboard',
    icon: PlannerIcon,
    title: 'My Planner'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '/app/logout',
    icon: LogOutIcon,
    title: 'Logout'
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
  userType, firstName, lastName, onMobileClose, openMobile
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {userType === 'CLIENT' ? <ClientIcon /> : <CoachIcon /> }
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
          {userType === 'COACH' ? itemsCoach.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          )) : itemsClient.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <SmallBox
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
      <SmallBox
        title="Having issues?"
        message="Please report any issue did you find. Help us to help you!"
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
  lastName: PropTypes.string
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps = (state) => {
  return {
    userType: state.auth.userInfo !== null ? state.auth.userInfo.type : null,
    firstName: state.auth.userInfo !== null ? state.auth.userInfo.firstname : null,
    lastName: state.auth.userInfo !== null ? state.auth.userInfo.lastname : null,
  };
};

export default connect(mapStateToProps, null)(NavBar);
