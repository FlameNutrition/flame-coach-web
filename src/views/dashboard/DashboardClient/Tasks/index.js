import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  useMediaQuery
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import moment from 'moment';
import nextId from 'react-id-generator';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DailyTask from '../../../../components/DailyTask';
import { logDebug } from '../../../../logging';
import TaskPanel from './TaskPanel';

const useStyles = makeStyles((theme) => ({
  root: {},
  dailyTaskPanel: {
    height: 400,
  },
  dailyTaskPanelRefreshBtn: {
    paddingRight: '10px'
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  dayOfWeek: {
    padding: '10px',
    fontWeight: 'bold'
  },
  dayOfWeekDivider: {
    marginTop: '10px'
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

  const isMobile = useMediaQuery('(max-width:600px)');
  const [tabIndex, setTabIndex] = React.useState(0);

  const changeTabHandler = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  logDebug('Task', 'render', 'Tasks', tasks);

  const tabs = taskPeriod !== 'today' ? moment.weekdays()
    .map((day, index) => (
      <Tab
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
        title="Daily Tasks"
        action={(
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
          >
            <Grid item className={classes.dailyTaskPanelRefreshBtn}>
              <IconButton aria-label="refresh">
                <RefreshIcon onClick={() => taskPeriodRefreshHandler()} />
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
          taskPeriod !== 'today'
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
                      <TaskPanel value={tabIndex} index={index}>
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
                      tasks.map((task) => (
                        <DailyTask
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
