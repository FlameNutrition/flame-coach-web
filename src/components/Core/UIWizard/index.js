import React from "react";
import PropTypes from "prop-types";

import { Button, Paper, Step, StepContent, StepLabel, Stepper } from "@material-ui/core";
import { useStyles } from "./style";

const UIWizard = ({
    steps,
    getStepContent,
    result,
    isWizardValid,
    handleFinish,
    handleResetValidator,
}) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        handleResetValidator();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}>
                                        Back
                                    </Button>
                                    {activeStep === steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                handleNext();
                                                handleFinish();
                                            }}
                                            className={classes.button}
                                            disabled={!isWizardValid}>
                                            Finish
                                        </Button>)}
                                    {activeStep !== steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={!isWizardValid}>
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    {result}
                    <Button onClick={handleReset}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );

};

UIWizard.propTypes = {
    steps: PropTypes.array.isRequired,
    getStepContent: PropTypes.func.isRequired,
    result: PropTypes.node.isRequired,
    isWizardValid: PropTypes.bool.isRequired,
    handleResetValidator: PropTypes.func.isRequired,
};

export default UIWizard;