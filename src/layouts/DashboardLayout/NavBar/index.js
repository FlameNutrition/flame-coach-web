import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

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
import Link from 'next/link';

import NavBarBox from '../../../components/NavBarBox';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { isFeatureEnable, MEASURES } from '../../../utils/toggles';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const itemsCoach = [
  {
    href: '/',
    icon: BarChartIcon,
    title: 'Dashboard',
    featureName: 'DASHBOARD'
  },
  {
    href: '/clients',
    icon: UsersIcon,
    title: 'Customers',
    featureName: 'CUSTOMERS'
  },
  {
    href: '/planner',
    icon: CalendarIcon,
    title: 'Planner',
    featureName: 'PLANNER'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account',
    featureName: 'ACCOUNT'
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings',
    featureName: 'SETTING'
  },
  {
    href: '/logout',
    icon: LogOutIcon,
    title: 'Logout',
    featureName: 'LOGOUT'
  },
];

const itemsClient = [
  {
    href: '/',
    icon: PlannerIcon,
    title: 'My Planner',
    featureName: 'DASHBOARD'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account',
    featureName: 'ACCOUNT'
  },
  {
    href: '/measures',
    icon: MeasuresIcon,
    title: 'Measures',
    featureName: MEASURES
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings',
    featureName: 'SETTINGS'
  },
  {
    href: '/logout',
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

const authSelector = (state) => state.auth;

const NavBar = ({
  onMobileClose,
  openMobile
}) => {
  const classes = useStyles();
  const router = useRouter();

  const auth = useSelector(authSelector);
  const userInfo = auth.userInfo !== null ? auth.userInfo : null;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [router.query]);

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
        <Link href="/account">
          <Avatar
            className={classes.avatar}
            component="a"
          >
            {userInfo.type === 'CLIENT' ? <ClientIcon/> : <CoachIcon/>}
          </Avatar>
        </Link>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {userInfo.firstName}
          {' '}
          {userInfo.lastName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Account Type:
          {' '}
          {userInfo.type === 'CLIENT' ? 'Client' : 'Coach'}
        </Typography>
      </Box>
      <Divider/>
      <Box p={2}>
        <List>
          {userInfo.type === 'COACH'
            ? itemsCoach.map((item) => {
              if (isFeatureEnable(item.href, userInfo.identifier)) {
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
              if (isFeatureEnable(item.href, userInfo.identifier)) {
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
      <Box flexGrow={1}/>
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
        btnHref={`${process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE}`}
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
        btnHref={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
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
};

NavBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default NavBar;
