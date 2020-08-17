import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile } from "@material-ui/core";
import { COLORS_PALETTE } from "../constants";

const ITEM_SIZE = 30;
const SPACE = 4;

const ColorsPalette = ({ color, onSelectColor }) => {
  const classes = useStyles();

  return (
    <GridList
      className={classes.root}
      spacing={SPACE}
      cellHeight={ITEM_SIZE}
      cols={3}
    >
      {COLORS_PALETTE.map(item => (
        <GridListTile key={item.id}>
          <div
            onClick={() => onSelectColor(item)}
            style={{ backgroundColor: item.color }}
            className={clsx(
              classes.item,
              item.id === color.id && classes.selectedItem,
              item.id === "white" && classes.whiteItem
            )}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

const useStyles = makeStyles({
  root: {
    width: SPACE * 6 + ITEM_SIZE * 3,
    padding: SPACE
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    cursor: "pointer"
  },
  whiteItem: {
    border: "2px solid #E8EAED"
  },
  selectedItem: {
    width: ITEM_SIZE - 2,
    height: ITEM_SIZE - 2,
    border: "2px solid grey"
  }
});

export default ColorsPalette;
