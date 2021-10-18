import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SimpleDialog(props) {

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>Waiting for your peer</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Difficulty: {props.difficulty}</DialogContentText>
        <DialogContentText id="alert-dialog-description">Category: {props.category}</DialogContentText>
      </DialogContent>
      <CircularProgress />
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
