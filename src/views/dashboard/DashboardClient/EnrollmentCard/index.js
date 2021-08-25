import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/styles/makeStyles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import {
  NavigateBefore as NavigateBackIcon,
  NavigateNext as NavigateNextIcon
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import ErrorMessage from '../../../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../../../components/Core/Notification/InfoMessage/InfoMessage';
import PropTypes from 'prop-types';
import Loading from '../../../../components/Core/Loading';
import ModalWarning from '../../../../components/ModalWarning';

const useStyles = makeStyles(() => ({
  root: {},
  coachConfirmation: {
    display: 'flex',
    flexFlow: 'row-reverse',
    paddingRight: '20px'
  },
  coachConfirmationNextBtn: {
    margin: '3px'
  },
  coachConfirmationBackBtn: {
    margin: '3px'
  }
}));

const EnrollmentCard = ({
  isLoading,
  activeCoachStep,
  setActiveCoachStep,
  enrollmentFinish,
  customerIdentifier,
  enrollmentStatus
}) => {
  const classes = useStyles();

  const steps = ['Waiting for a coach invitation', 'Do you want be part of this experience?', 'Confirmation'];

  return (
    <Card>
      <CardContent>
        {isLoading ? <Loading/>
          : (
            <>
              <Stepper activeStep={activeCoachStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div className={classes.coachConfirmation}>
                {activeCoachStep === steps.length ? (
                  <IconButton
                    aria-label="Reset"
                    disabled
                    onClick={() => setActiveCoachStep(0)}
                  />
                ) : (
                  <div>
                    <IconButton
                      color="primary"
                      aria-label="Back"
                      className={classes.coachConfirmationBackBtn}
                      disabled={activeCoachStep === 0}
                      onClick={() => {
                        if (activeCoachStep === 1) {
                          enrollmentFinish.mutate({
                            customerIdentifier,
                            flag: false
                          });
                        } else {
                          setActiveCoachStep((prevState) => prevState - 1);
                        }
                      }}
                    >
                      <NavigateBackIcon/>
                    </IconButton>

                    <IconButton
                      color="primary"
                      aria-label={activeCoachStep === steps.length - 1 ? 'Finish' : 'Next'}
                      className={classes.coachConfirmationNextBtn}
                      disabled={enrollmentStatus === 'AVAILABLE'}
                      onClick={() => {
                        if (activeCoachStep === 2) {
                          enrollmentFinish.mutate({
                            customerIdentifier,
                            flag: true
                          });
                        } else {
                          setActiveCoachStep((prevState) => prevState + 1);
                        }
                      }}
                    >
                      <NavigateNextIcon/>
                    </IconButton>
                  </div>
                )}
              </div>
              {activeCoachStep === steps.length - 1 ? (
                <div className={classes.coachConfirmation}>
                  <Alert severity={ErrorMessage.CODE_0004.level.toLowerCase()}>
                    {' '}
                    {ErrorMessage.CODE_0004.msg}
                  </Alert>
                </div>
              ) : null}

              {activeCoachStep === steps.length ? (
                <div className={classes.coachConfirmation}>
                  <Alert severity={InfoMessage.CODE_0001.level.toLowerCase()}>
                    {' '}
                    {InfoMessage.CODE_0001.msg}
                  </Alert>
                </div>
              ) : null}
            </>
          )}
      </CardContent>
    </Card>
  );
};

EnrollmentCard.propTypes = {
  activeCoachStep: PropTypes.number.isRequired,
  setActiveCoachStep: PropTypes.func.isRequired,
  enrollmentFinish: PropTypes.object.isRequired,
  customerIdentifier: PropTypes.string.isRequired,
  enrollmentStatus: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};

ModalWarning.defaultProps = {
  enrollmentStatus: ''
};

export default EnrollmentCard;
