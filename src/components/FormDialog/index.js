import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  dialogTitle: {
    "& h2": {
      fontSize: 25
    }
  },
  dialogContentText: {
    fontSize: 15
  }
}));

const FormDialog = ({
  submitHandler,
  dialogTitle,
  dialogDescription,
  open,
  closeHandler,
  deleteHandler,
  okHandler,
  children
}) => {

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="form-dialog-title">
      <DialogTitle
        id="form-dialog-title"
        className={classes.dialogTitle}>{dialogTitle}</DialogTitle>
      <form
        autoComplete="off"
        onSubmit={submitHandler(okHandler)}>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            {dialogDescription}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {deleteHandler !== null ?
            <Button onClick={deleteHandler} color="primary">
              Delete
            </Button>
            : null}
          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

};

FormDialog.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogDescription: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  deleteHandler: PropTypes.func,
  closeHandler: PropTypes.func.isRequired,
  okHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

FormDialog.defaultProps = {
  deleteHandler: null
};

export default FormDialog;
