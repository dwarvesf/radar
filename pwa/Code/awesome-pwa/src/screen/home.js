import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";
import AddNote from "../components/AddNote";
import NotesList from "../components/NotesList";
import { loadNotes, useApp, showNotification } from "../AppContextState";
import useOnlineStatus from "../components/useOnlineStatus";

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [appState, dispatch] = useApp();
  const { notes } = appState;

  const isOnline = useOnlineStatus(null, () => {
    dispatch(showNotification("info", "Offline"));
  });

  React.useEffect(() => {
    loadNotes(dispatch, isOnline);
  }, [dispatch, isOnline]);

  const handleMenuIconClick = () => {
    setOpen(o => !o);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Header onMenuIconClick={handleMenuIconClick} />
      <DrawerMenu open={open} onDrawerClose={handleDrawerClose} />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div className={classes.addNoteWrap}>
          <AddNote />
        </div>
        <NotesList {...notes} />
      </main>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex"
  },
  main: {
    flexGrow: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 16,
    [theme.breakpoints.up("sm")]: {
      padding: 24
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  addNoteWrap: {
    marginBottom: 24,
    [theme.breakpoints.up("sm")]: {
      margin: "24px auto"
    }
  },
  toolbar: theme.mixins.toolbar
}));

export default Home;
