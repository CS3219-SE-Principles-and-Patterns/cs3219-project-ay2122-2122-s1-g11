import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    display: 'flex',
    margin: 'auto',
    marginTop: '2em'
  },
  dialogText: {
    display: 'flex',
    margin: 'auto'
  }
});

export default function SimpleDialog(props) {
  const classes = useStyles(props);

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>Waiting for your peer</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className={classes.dialogText}>Difficulty: {props.difficulty}</DialogContentText>
        <DialogContentText id="alert-dialog-description" className={classes.dialogText}>Category: {props.category}</DialogContentText>  
        <CircularProgress className={classes.spinner} />
      </DialogContent>
      <DialogActions >
        <Button onClick={props.handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
