import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  Slide,
  DialogTitle
} from "@material-ui/core";

const Note = ({ open, onAcceptInstall, onDeclineInstall }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick={true}
      aria-labelledby="Install app promote"
      aria-describedby="Install app promote"
      classes={{
        scrollPaper: classes.scrollPaper
      }}
    >
      <DialogTitle className={classes.text}>
        Get our free app. It's won't take up space on your phone.
      </DialogTitle>
      <DialogActions>
        <Button onClick={onDeclineInstall} color="secondary">
          Disagree
        </Button>
        <Button onClick={onAcceptInstall} color="secondary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  scrollPaper: {
    alignItems: "flex-end"
  },
  text: {
    textAlign: "center"
  }
}));

export default Note;
