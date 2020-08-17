import React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import IconClose from "@material-ui/icons/Close";
import IconCheck from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import useHover from "./useHover";
import {
  useApp,
  useAppDispatch,
  loadLabels,
  saveLabel,
  hideLabelsModal,
  deleteLabel
} from "../AppContextState";

const LabelsModal = ({ open }) => {
  const labelsModalId = "labelsModalId";
  const [appState, dispatch] = useApp();
  const {
    labels: { data: labels }
  } = appState;
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    loadLabels(dispatch);
  }, [dispatch]);

  const handleClose = () => {
    dispatch(hideLabelsModal());
  };

  const handleTextChange = e => {
    setLabel(e.target.value);
  };

  const handleSave = () => {
    if (label) {
      setLabel("");
      saveLabel(dispatch, { name: label });
    }
  };

  return (
    <Dialog
      fullScreen={false}
      open={open}
      onClose={handleClose}
      aria-labelledby={labelsModalId}
    >
      <DialogTitle id={labelsModalId}>Edit Labels</DialogTitle>
      <List>
        <ListItem autoFocus>
          <IconButton>
            <IconClose />
          </IconButton>
          <TextField
            value={label}
            onChange={handleTextChange}
            autoFocus
            autoComplete="off"
            id="label"
            name="label"
          />
          <IconButton onClick={handleSave}>
            <IconCheck />
          </IconButton>
        </ListItem>
        {labels.map(item => (
          <LabelItem key={item.id} label={item} />
        ))}
      </List>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LabelItem = ({ label }) => {
  const [rootEl, isHovered] = useHover();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    deleteLabel(dispatch, label);
  };

  return (
    <ListItem ref={rootEl}>
      {isHovered ? (
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton>
          <LabelIcon />
        </IconButton>
      )}
      <ListItemText primary={label.name} />
      <IconButton>
        <EditIcon />
      </IconButton>
    </ListItem>
  );
};

export default LabelsModal;
