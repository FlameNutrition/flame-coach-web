import React from 'react';
import nextId from 'react-id-generator';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { RotateCw as UpdateIcon, Trash2 as DeleteIcon } from 'react-feather';
import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {},
  accordionSummary: {
    display: 'flex',
    flexFlow: 'column-reverse'
  },
  date: {
    display: 'flex',
    flexFlow: 'flex-end',
    alignItems: 'center',
    color: theme.palette.text.secondary
  },
  taskName: {
    display: 'flex',
    alignItems: 'center'
  },
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
  task,
  enableDelete,
  enableUpdate,
  enableCheck,
  enableDate,
  updateTaskHandler,
  deleteTaskHandler,
  checkTaskHandler
}) => {
  const classes = useStyles();

  return (
    <Accordion
      data-testid="identifier"
      id={task.identifier}
      key={nextId()}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        {(enableCheck && !enableDelete)
          ? (
            <div className={classes.accordionSummary}>
              <FormControlLabel
                data-testid="formControlLabelCheckTask"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={(
                  <Checkbox
                    data-testid="checkedTask"
                    onChange={(value) => checkTaskHandler(task, value)}
                    checked={task.ticked}
                  />
                )}
                label={task.taskName}
              />
              {enableDate
                ? (
                  <Typography data-testid="date" component="span" className={classes.date}>
                    {task.date}
                  </Typography>
                ) : null}
            </div>
          )
          : null}
        {(!enableCheck && enableDelete)
          ? (
            <>
              <FormControlLabel
                data-testid="formControlLabelDeleteTask"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={(
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    data-testid="deleteTask"
                    onClick={() => deleteTaskHandler(task)}
                  >
                    <SvgIcon
                      fontSize="small"
                      color="inherit"
                    >
                      <DeleteIcon/>
                    </SvgIcon>
                  </Button>
                )}
                label=""
              />
              <Typography
                data-testid="name"
                component="div"
                className={classes.taskName}
              >
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
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              data-testid="description"
              color="textSecondary"
            >
              {task.taskDescription}
            </Typography>
          </Grid>
          {enableUpdate
            ? (
              <Grid item>
                <Button
                  className={classes.updateButton}
                  variant="contained"
                  data-testid="updateTask"
                  onClick={() => updateTaskHandler(task)}
                >
                  Update
                  <SvgIcon
                    className={classes.updateButtonIcon}
                    fontSize="small"
                    color="inherit"
                  >
                    <UpdateIcon/>
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
  enableDate: PropTypes.bool,
  deleteTaskHandler: PropTypes.func,
  updateTaskHandler: PropTypes.func,
  checkTaskHandler: PropTypes.func
};

DailyTask.defaultProps = {
  enableDelete: false,
  enableUpdate: false,
  enableCheck: false,
  enableDate: false,
  deleteTaskHandler: null,
  updateTaskHandler: null,
  checkTaskHandler: null
};

export default DailyTask;
