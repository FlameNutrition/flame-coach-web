import React from 'react';
import update from 'immutability-helper';
import UIWizard from '../Core/UIWizard';
import Loading from '../Core/Loading';
import UIText from '../Core/UIText';

import { useStyles } from './style';
import { MenuItem, TextField } from "@material-ui/core";
import { useHarrisBenedictCalculator } from '../../api/calculator/useHarrisBenedictCalculator';

const Calculator = () => {

    const classes = useStyles();

    const [caloriesCalculator, setCaloriesCalculator] = React.useState(
        {
            age: 20,
            gender: 'Male',
            height: 170,
            weight: 80.5,
            pal: -1
        }
    );

    const harrisBenedictCalculator = useHarrisBenedictCalculator({
        weight: caloriesCalculator.weight,
        height: caloriesCalculator.height,
        gender: caloriesCalculator.gender,
        age: caloriesCalculator.age,
        pal: caloriesCalculator.pal == -1 ? null : caloriesCalculator.pal
    }, {
        enabled: false
    });

    const [isWizardValid, setIsWizardValid] = React.useState(true);

    const steps = ['Age', 'Gender', 'Height', 'Weight', 'Activity Level'];

    const wizardStep0ClientAge = React.useMemo(() => {
        return (
            <div>
                <div>What is the age of your client?</div>
                <TextField
                    id='client-age'
                    data-testid='client-age'
                    className={classes.questionInput}
                    type='number'
                    error={!isWizardValid}
                    inputProps={{
                        step: 1,
                        min: 0
                    }}
                    value={caloriesCalculator.age}
                    onChange={(event) => {
                        if (!isNaN(event.target.valueAsNumber)) {
                            setIsWizardValid(true);
                            setCaloriesCalculator(update(caloriesCalculator, { age: { $set: event.target.valueAsNumber } }));
                        } else {
                            setIsWizardValid(false);
                        }
                    }}
                />
            </div>
        );
    });

    const wizardStep1ClientGender = React.useMemo(() => {
        return (
            <div>
                <div>What is the gender of your client?</div>
                <TextField
                    id='client-gender'
                    data-testid='client-gender'
                    className={classes.questionInput}
                    value={caloriesCalculator.gender}
                    select
                    onChange={(event) => {
                        setCaloriesCalculator(update(caloriesCalculator, { gender: { $set: event.target.value } }));
                    }}>
                    <MenuItem key='Male' value='Male'>Male</MenuItem>
                    <MenuItem key='Female' value='Female'>Female</MenuItem>
                </TextField>
            </div>
        );
    });

    const wizardStep2ClientHeight = React.useMemo(() => {
        return (
            <div>
                <div>What is the height of your client (cm)?</div>
                <TextField
                    id='client-height'
                    data-testid='client-height'
                    className={classes.questionInput}
                    type='number'
                    error={!isWizardValid}
                    inputProps={{
                        min: 0
                    }}
                    value={caloriesCalculator.height}
                    onChange={(event) => {
                        if (!isNaN(event.target.valueAsNumber)) {
                            setIsWizardValid(true);
                            setCaloriesCalculator(update(caloriesCalculator, { height: { $set: event.target.valueAsNumber } }));
                        } else {
                            setIsWizardValid(false);
                        }
                    }}
                />
            </div>
        );
    });

    const wizardStep3ClientWeight = React.useMemo(() => {
        return (
            <div>
                <div>What is the wight of your client (kg)?</div>
                <TextField
                    id='client-weight'
                    data-testid='client-weight'
                    className={classes.questionInput}
                    type='number'
                    error={!isWizardValid}
                    inputProps={{
                        step: 0.05,
                        min: 0
                    }}
                    value={caloriesCalculator.weight}
                    onChange={(event) => {
                        if (!isNaN(event.target.valueAsNumber)) {
                            setIsWizardValid(true);
                            setCaloriesCalculator(update(caloriesCalculator, { weight: { $set: event.target.valueAsNumber } }));
                        } else {
                            setIsWizardValid(false);
                        }
                    }}
                />
            </div>
        );
    });

    const wizardStep4ClientActivity = React.useMemo(() => {
        return (
            <div>
                <div>What is the activity level of your client (kg)?</div>
                <TextField
                    id='client-activity'
                    data-testid='client-activity'
                    className={classes.questionInput}
                    value={caloriesCalculator.pal}
                    select
                    onChange={(event) => {
                        setCaloriesCalculator(update(caloriesCalculator, { pal: { $set: event.target.value } }));
                    }}>
                    <MenuItem key='BMR' value='-1'>Basal Metabolic Rate</MenuItem>
                    <MenuItem key='SEDENTARY' value='0'>Sedentary: little or no exercise</MenuItem>
                    <MenuItem key='LIGHT' value='1'>Light: exercise 1-3 times/week</MenuItem>
                    <MenuItem key='MODERATE' value='2'>Moderate: exercise 4-5 times/week</MenuItem>
                    <MenuItem key='ACTIVE' value='3'>Active: daily exercise or intense exercise 3/4 times/week</MenuItem>
                    <MenuItem key='VERY' value='4'>Very Active: intense exercise 6/7 times/week</MenuItem>
                    <MenuItem key='EXTRA' value='5'>Extra Active: very intense exercise daily, or physical job</MenuItem>
                </TextField>
            </div>
        );
    });

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return wizardStep0ClientAge;
            case 1:
                return wizardStep1ClientGender;
            case 2:
                return wizardStep2ClientHeight;
            case 3:
                return wizardStep3ClientWeight;
            case 4:
                return wizardStep4ClientActivity;
            default:
                return 'Unknown step';
        }
    };


    return (
        <UIWizard
            steps={steps}
            getStepContent={getStepContent}
            result={
                (harrisBenedictCalculator.isLoading && <Loading />) ||
                (!harrisBenedictCalculator.isLoading &&
                    <div>
                        <UIText padding='0px 0px 10px'>
                            This is the total of calories based on Harris-Benedict formula: <b>{harrisBenedictCalculator.data?.result}</b> kcal/day.
                        </UIText>
                    </div>
                )
            }
            handleFinish={() => harrisBenedictCalculator.refetch()}
            handleResetValidator={() => setIsWizardValid(true)}
            isWizardValid={isWizardValid} />
    );

};

export default Calculator;