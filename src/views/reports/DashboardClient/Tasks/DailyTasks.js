import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import nextId from 'react-id-generator';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography
} from '@material-ui/core';

const DailyTasks = ({ tasks }) => {
  const tasksAccordion = [];

  tasks
    .forEach((task) => {
      const taskAccordion = (
        <Accordion key={nextId()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox value={task.taskTicked} />}
              label={task.taskTitle}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              {task.taskDescription}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );

      tasksAccordion.push(taskAccordion);
    });

  return (
    <Box p="10px">
      {tasksAccordion}
    </Box>
  );
};

DailyTasks.propTypes = {
  tasks: PropTypes.array
};

export default DailyTasks;
