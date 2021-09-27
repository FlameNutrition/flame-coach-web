import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { Refresh as RefreshIcon } from "@material-ui/icons";
import moment from "moment";
import nextId from "react-id-generator";
import PerfectScrollbar from "react-perfect-scrollbar";
import DailyTask from "../../../../components/DailyTask";
import { logDebug } from "../../../../logging";
import TaskPanel from "./TaskPanel";
import { useIsMobile } from "../../../../utils/mediaUtil";

const useStyles = makeStyles((theme) => ({
  root: {},
  dailyTaskPanel: {
    height: 400
  },
  dailyTaskPanelRefreshBtn: {
    paddingRight: "10px"
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  dayOfWeek: {
    padding: "10px",
    fontWeight: "bold"
  },
  dayOfWeekDivider: {
    marginTop: "10px"
  }
}));

const Tasks = ({
  tasks,
  taskPeriod,
  taskPeriodHandler,
  taskPeriodRefreshHandler,
  updateTaskHandler,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const isMobile = useIsMobile();
  const [tabIndex, setTabIndex] = React.useState(0);

  const changeTabHandler = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  logDebug("Task", "render", "Tasks", tasks);

  const tabs = taskPeriod !== "today" ? moment.weekdays()
      .map((day, index) => (
        <Tab
          key={index}
          label={isMobile ? day.slice(0, 3) : day}
          id={`task-tab-${index}`}
          aria-controls={`task-tabpanel-${index}`}
        />
      ))
    : null;

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Daily Routine"
        action={(
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item className={classes.dailyTaskPanelRefreshBtn}>
              <IconButton aria-label="refresh"
                          onClick={() => taskPeriodRefreshHandler()}>
                <RefreshIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Select
                name="type"
                onChange={(event) => taskPeriodHandler(event)}
                value={taskPeriod}
                variant="outlined"
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This week</MenuItem>
                <MenuItem value="lastWeek">Last week</MenuItem>
                <MenuItem value="nextWeek">Next week</MenuItem>
              </Select>
            </Grid>
          </Grid>
        )}
      />
      <Divider />
      <Box p="10px">
        {
          taskPeriod !== "today"
            ? (
              <div className={clsx(classes.dailyTaskPanel, classes.tabPanel)}>
                <Tabs
                  className={classes.tabs}
                  orientation="vertical"
                  variant="scrollable"
                  value={tabIndex}
                  onChange={changeTabHandler}
                  aria-label="Days of Week"
                >
                  {tabs}
                </Tabs>
                {
                  moment.weekdays()
                    .map((_, index) => (
                      <TaskPanel key={index} value={tabIndex} index={index}>
                        <PerfectScrollbar>
                          <Box m="2px">
                            {
                              tasks
                                .filter((task) => moment(task.date)
                                  .weekday() === index)
                                .map((task) => (
                                  <DailyTask
                                    key={nextId()}
                                    task={task}
                                    checkTaskHandler={updateTaskHandler}
                                    enableCheck
                                    enableDate
                                  />
                                ))
                            }
                          </Box>
                        </PerfectScrollbar>
                      </TaskPanel>
                    ))
                }

              </div>
            )
            : (
              <PerfectScrollbar>
                <div className={clsx(classes.dailyTaskPanel)}>
                  <Box m="2px">
                    {
                      tasks.map((task, index) => (
                        <DailyTask
                          key={index}
                          task={task}
                          enableCheck
                          checkTaskHandler={updateTaskHandler}
                        />
                      ))
                    }
                  </Box>

                </div>
              </PerfectScrollbar>
            )
        }
      </Box>
    </Card>
  );
};

Tasks.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object,
  tasks: PropTypes.array,
  taskPeriod: PropTypes.string,
  taskPeriodHandler: PropTypes.func,
  taskPeriodRefreshHandler: PropTypes.func,
  updateTaskHandler: PropTypes.func
};

export default Tasks;
