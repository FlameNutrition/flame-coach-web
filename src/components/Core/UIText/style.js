import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    text: {
        padding: props => props.padding,
        fontSize: '14px',
    },
}));