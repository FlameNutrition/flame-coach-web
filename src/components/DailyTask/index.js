import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button, Checkbox, FormControlLabel, Grid,
  makeStyles,
  SvgIcon,
  Typography
} from '@material-ui/core';
import nextId from 'react-id-generator';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { Trash2 as DeleteIcon, RotateCw as UpdateIcon } from 'react-feather';
import logger from 'loglevel';

const useStyles = makeStyles((theme) => ({
  root: {},
  deleteButton: {
    backgroundColor: theme.palette.button.dangerous,
    marginLeft: '10px'
  },
  updateButton: {
    backgroundColor: theme.palette.button.warning,
  },
  updateButtonIcon: {
    marginLeft: '10px'
  }
}));

const DailyTask = ({
  task, enableDelete, enableUpdate, enableCheck,
  updateTaskHandler, deleteTaskHandler, checkTaskHandler
}) => {
  const classes = useStyles();

  if (enableCheck) {
    logger.debug('%s Checkbox enable', 'DailyTask -');
  }

  if (enableDelete) {
    logger.debug('%s Delete button enable', 'DailyTask -');
  }

  return (
    <Accordion
      id={task.identifier}
      key={nextId()}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        {(enableCheck && !enableDelete)
          ? (
            <FormControlLabel
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={(
                <Checkbox
                  onChange={(value) => checkTaskHandler(task, value)}
                  value={task.ticked}
                />
              )}
              label={task.taskName}
            />
          )
          : null}
        {(!enableCheck && enableDelete)
          ? (
            <>
              <FormControlLabel
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={(
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    onClick={() => deleteTaskHandler(task)}
                  >
                    <SvgIcon
                      fontSize="small"
                      color="inherit"
                    >
                      <DeleteIcon />
                    </SvgIcon>
                  </Button>
              )}
                label=""
              />
              <Typography component="div">
                {task.taskName}
              </Typography>
            </>
          )
          : null}
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography color="textSecondary">
              {task.taskDescription}
            </Typography>
          </Grid>
          {enableUpdate
            ? (
              <Grid item>
                <Button
                  className={classes.updateButton}
                  variant="contained"
                  onClick={() => updateTaskHandler(task)}
                >
                  Update
                  <SvgIcon
                    className={classes.updateButtonIcon}
                    fontSize="small"
                    color="inherit"
                  >
                    <UpdateIcon />
                  </SvgIcon>
                </Button>
              </Grid>
            ) : null}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

DailyTask.propTypes = {
  task: PropTypes.object.isRequired,
  enableDelete: PropTypes.bool,
  enableUpdate: PropTypes.bool,
  enableCheck: PropTypes.bool,
  deleteTaskHandler: PropTypes.func,
  updateTaskHandler: PropTypes.func,
  checkTaskHandler: PropTypes.func
};

DailyTask.defaultProps = {
  enableDelete: false,
  enableUpdate: false,
  enableCheck: false,
  deleteTaskHandler: null,
  updateTaskHandler: null,
  checkTaskHandler: null
};

export default DailyTask;
