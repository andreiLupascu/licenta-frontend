import {useStyles} from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React from "react";

export const CommitteeGrid = props => {
    const classes = useStyles();
    return (
      <div className={classes.gridParent}>
        {props.items.map(item => (
          <Button
            className={classes.gridChild}
            onClick={() => props.handleClick(item.link)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    );
  };