import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  InputBase,
  Button,
  IconButton,
  Popover,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip
} from "@material-ui/core";
import { Palette, Image, Label as LabelIcon } from "@material-ui/icons";
import ColorPalette from "./ColorPalette";
import { uploadImage } from "../services/firebase";
import { useApp, showNotification, saveNote } from "../AppContextState";
import useOnClickOutside from "./useOnClickOutside";
import useOnlineStatus from "./useOnlineStatus";
import { COLORS_PALETTE } from "../constants";
import { getBase64Image } from "../utils";

const AddNote = () => {
  const classes = useStyles();
  const contentEl = React.useRef(null);
  const imageEl = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const [colorPaletteEl, setColorPaletteEl] = React.useState(null);
  const [labelIconEl, setLabelIconEl] = React.useState(null);
  // note title
  const [title, setTitle] = React.useState("");
  // note content
  const [note, setNote] = React.useState("");
  // note image
  const [image, setImage] = React.useState("");
  // note color
  const [color, setColor] = React.useState(COLORS_PALETTE[0]);
  // note labels
  const [noteLabels, setNoteLabels] = React.useState([]);

  const [appState, dispatch] = useApp();
  const {
    labels: { data: labels }
  } = appState;
  const isOnline = useOnlineStatus();

  const handleFocus = () => setFocused(true);

  useOnClickOutside(contentEl, () => {
    if (!colorPaletteEl && !labelIconEl) {
      setFocused(false);
    }
  });

  const open = Boolean(colorPaletteEl);
  const colorPaletteId = open ? "color-palette" : undefined;

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleNoteChange = e => {
    setNote(e.target.value);
  };

  const handleOpenColorPalette = event => {
    setColorPaletteEl(event.currentTarget);
  };

  const handleCloseColorPalette = () => {
    setColorPaletteEl(null);
  };

  const handleSelectImage = () => {
    imageEl.current.click();
  };

  const handleFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let uploaded;
      try {
        if (isOnline) {
          uploaded = await uploadImage(file);
        } else {
          uploaded = await getBase64Image(file);
        }
      } catch (error) {
        console.log("Upload error. Use offline instead !", error);
        uploaded = await getBase64Image(file);
      }
      setImage(uploaded);
    }
  };

  const handleAddNote = () => {
    if (title || note || image) {
      setNote("");
      setTitle("");
      setImage("");
      setColor(COLORS_PALETTE[0]);
      setNoteLabels([]);
      setFocused(false);
      const noteObj = {
        title,
        note,
        image,
        labels: noteLabels,
        color
      };
      saveNote(dispatch, noteObj, isOnline).then(() => {
        dispatch(showNotification("success", "Note Created"));
      });
    }
  };

  const handleSelectColor = item => {
    setColor(item);
  };

  const handleOpenLabels = event => {
    setLabelIconEl(event.currentTarget);
  };

  const handleCloseLabels = () => {
    setLabelIconEl(null);
  };

  const toggleSelectLabel = (checked, item) => {
    if (checked) {
      setNoteLabels(labels => [...[item], ...labels]);
    } else {
      setNoteLabels(labels => labels.filter(i => i.id !== item.id));
    }
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <div
        ref={contentEl}
        className={classes.content}
        style={{ backgroundColor: color.color }}
      >
        {image && (
          <div>
            <img
              alt="note"
              className={classes.image}
              src={typeof image === "string" ? image : image.name}
            />
          </div>
        )}
        <div className={classes.inputs}>
          {focused && (
            <InputBase
              placeholder="Title"
              classes={{
                root: classes.titleRoot,
                input: classes.titleInput
              }}
              value={title}
              inputProps={{
                "aria-label": "Title",
                onFocus: handleFocus,
                onChange: handleTitleChange
              }}
            />
          )}
          <InputBase
            placeholder="New Note"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{
              "aria-label": "New Note",
              onFocus: handleFocus,
              onChange: handleNoteChange
            }}
          />
        </div>
        {focused && (
          <div className={classes.chips}>
            {noteLabels.map(item => (
              <Chip
                key={item.id}
                size="small"
                label={item.name}
                onDelete={() => toggleSelectLabel(false, item)}
              />
            ))}
          </div>
        )}
        {focused && (
          <div className={classes.actions}>
            <IconButton
              aria-describedby={colorPaletteId}
              onClick={handleOpenColorPalette}
              aria-label="Palette"
              aria-owns={colorPaletteId}
              aria-haspopup="true"
            >
              <Palette />
            </IconButton>
            <IconButton onClick={handleSelectImage} aria-label="Image">
              <Image />
            </IconButton>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpenLabels}
              aria-label="Archive"
            >
              <LabelIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={labelIconEl}
              keepMounted
              open={Boolean(labelIconEl)}
              onClose={handleCloseLabels}
            >
              {labels.map(label => (
                <MenuItem
                  key={label.id}
                  onClick={() =>
                    toggleSelectLabel(
                      !noteLabels.some(item => item.id === label.id),
                      label
                    )
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={noteLabels.some(item => item.id === label.id)}
                      value={label.id}
                      inputProps={{ "aria-label": label.name }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={label.name} />
                </MenuItem>
              ))}
            </Menu>
            <div className={classes.flex1} />
            <Button color="primary" variant="contained" onClick={handleAddNote}>
              Save
            </Button>
          </div>
        )}
      </div>
      <Popover
        classes={{
          root: classes.popover
        }}
        id={colorPaletteId}
        open={open}
        anchorEl={colorPaletteEl}
        onClose={handleCloseColorPalette}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        disableRestoreFocus
      >
        <ColorPalette color={color} onSelectColor={handleSelectColor} />
      </Popover>
      <input
        style={{ visibility: "hidden", position: "absolute", left: -9999 }}
        type="file"
        ref={imageEl}
        multiple={false}
        onChange={handleFileChange}
      />
    </Paper>
  );
};

AddNote.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 600
    }
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  inputs: {
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column"
  },
  titleRoot: {
    flex: 1,
    marginBottom: 16
  },
  titleInput: {
    padding: 0,
    fontWeight: "700"
  },
  inputRoot: {
    flex: 1
  },
  inputInput: {
    padding: 0
  },
  chips: {
    padding: "0 20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  actions: {
    padding: "16px 8px",
    display: "flex",
    alignItems: "center"
  },
  flex1: {
    display: "flex",
    flex: 1
  },
  image: {
    width: "100%",
    height: "auto"
  },
  popover: {
    pointerEvents: "auto"
  }
}));

export default AddNote;
