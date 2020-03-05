import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  Chip
} from "@material-ui/core";
import useHover from "./useHover";

const Note = ({ note }) => {
  const classes = useStyles();
  const { title, note: content, color, image, labels = [] } = note;
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <Card
        className={classes.root}
        style={{ backgroundColor: color.color }}
        variant={isHovered ? "elevation" : "outlined"}
      >
        {image && (
          <CardMedia title={title}>
            <img src={image} alt={title} className={classes.media} />
          </CardMedia>
        )}
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {content}
          </Typography>
          <div className={classes.labels}>
            {labels.map(item => (
              <Chip
                key={item.id}
                size="small"
                label={item.name}
                // onDelete={() => toggleSelectLabel(false, item)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  labels: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -theme.spacing(0.5),
    marginRight: -theme.spacing(0.5),
    marginTop: 16,
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  media: {
    width: "100%",
    height: "auto"
  }
}));

export default Note;
