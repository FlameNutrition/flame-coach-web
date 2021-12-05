import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {
  BarChart as BarChartIcon,
  Calendar as CalendarIcon,
  DollarSign as IncomeIcon,
  Clipboard as CalculatorIcon,
  Heart as MeasuresIcon,
  LogOut as LogOutIcon,
  PhoneCall as AppointmentsIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon
} from "react-feather";
import { PeopleOutline as CoachIcon, PermIdentity as ClientIcon } from "@material-ui/icons";
import { useEffect } from "react";
import Link from "next/link";

import NavBarBox from "../../../components/NavBarBox";
import NavItem from "./NavItem";
import PropTypes from "prop-types";
import { isFeatureEnable } from "../../../utils/toggles";
import { useRouter } from "next/router";

const itemsCoach = [
  {
    href: "/",
    icon: BarChartIcon,
    title: "Dashboard"
  },
  {
    href: "/clients",
    icon: UsersIcon,
    title: "Customers"
  },
  {
    href: "/planner",
    icon: CalendarIcon,
    title: "Planner"
  },
  {
    href: "/appointments",
    icon: AppointmentsIcon,
    title: "Appointments"
  },
  {
    href: "/income",
    icon: IncomeIcon,
    title: "Income"
  },
  {
    href: "/coach/calculator",
    icon: CalculatorIcon,
    title: "Calculator"
  },
  {
    href: "/account",
    icon: UserIcon,
    title: "Account"
  },
  {
    href: "/settings",
    icon: SettingsIcon,
    title: "Settings"
  },
  {
    href: "/logout",
    icon: LogOutIcon,
    title: "Logout"
  }
];

const itemsClient = [
  {
    href: "/",
    icon: BarChartIcon,
    title: "Dashboard"
  },
  {
    href: "/account",
    icon: UserIcon,
    title: "Account"
  },
  {
    href: "/measures",
    icon: MeasuresIcon,
    title: "Measures"
  },
  {
    href: "/settings",
    icon: SettingsIcon,
    title: "Settings"
  },
  {
    href: "/logout",
    icon: LogOutIcon,
    title: "Logout"
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)"
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    marginBottom: "10px"
  }
}));

const NavBar = ({
  user,
  onMobileClose,
  openMobile
}) => {
  const classes = useStyles();
  const router = useRouter();

  //logInfo("NavBar", "render", "user", user);

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
        <Link passHref href="/account">
          <Avatar
            className={classes.avatar}
            component="a"
          >
            {user.type === "CLIENT" ? <ClientIcon /> : <CoachIcon />}
          </Avatar>
        </Link>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.firstname}
          {" "}
          {user.lastname}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Account Type:
          {" "}
          {user.type === "CLIENT" ? "Client" : "Coach"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {user.type === "COACH"
            ? itemsCoach.map((item) => {
              if (isFeatureEnable(item.href, user.identifier)) {
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
              if (isFeatureEnable(item.href, user.identifier)) {
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
  user: PropTypes.object.isRequired,
  onMobileClose: PropTypes.func.isRequired,
  openMobile: PropTypes.bool.isRequired
};

NavBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default NavBar;
