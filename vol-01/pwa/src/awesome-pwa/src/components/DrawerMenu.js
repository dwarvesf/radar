import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Hidden
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LabelIcon from "@material-ui/icons/Label";
import WifiIcon from "@material-ui/icons/Wifi";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import { useApp, showLabelsModal, loadLabels } from "../AppContextState";

const drawerWidth = 240;

const HeaderCategories = [
  { name: "note", label: "Note", icon: <WifiIcon /> },
  { name: "reminder", label: "Reminder", icon: <NotificationsIcon /> }
];

const FooterCategories = [
  { name: "archived", label: "Archived", icon: <ArchiveIcon /> },
  { name: "trash", label: "Trash", icon: <DeleteIcon /> }
];

const DrawerMenu = props => {
  const { open, onDrawerClose } = props;
  const [appState, dispatch] = useApp();
  const {
    labels: { data: labels }
  } = appState;
  const classes = useStyles();

  React.useEffect(() => {
    loadLabels(dispatch);
  }, [dispatch]);

  const handleEditLabelsClick = () => {
    dispatch(showLabelsModal());
  };

  const drawerContent = isMobile => (
    <React.Fragment>
      {!isMobile && <div className={classes.toolbar} />}
      <List>
        {HeaderCategories.map(item => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {labels.map(label => (
          <ListItem button key={label.id}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={label.name} />
          </ListItem>
        ))}
        <ListItem onClick={handleEditLabelsClick} button>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={"Edit labels"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {FooterCategories.map(item => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          onClose={onDrawerClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
          open={open}
        >
          {drawerContent(true)}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          variant="persistent"
          open
        >
          {drawerContent(false)}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  toolbar: theme.mixins.toolbar
}));

export default DrawerMenu;
