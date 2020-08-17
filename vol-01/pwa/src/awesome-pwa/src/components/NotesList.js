import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import Note from "./Note";

const NotesList = props => {
  const { data, loading } = props;
  const classes = useStyles();

  const renderLoader = (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );

  if (loading) {
    return renderLoader;
  }

  return (
    <Grid container spacing={3}>
      {data.map(note => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
          <Note note={note} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%"
  },
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default NotesList;
