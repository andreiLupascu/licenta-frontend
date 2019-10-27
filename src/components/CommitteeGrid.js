import {useStyles} from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React from "react";
import {Redirect, useHistory} from "react-router-dom"

export const CommitteeGrid = props => {
    const classes = useStyles();
    let history = useHistory();
    return (
      <div className={classes.gridParent}>
        {props.items.map(item => (
          <Button
            className={classes.gridChild}
            onClick={() => history.push(`/committees/committeeId=${item.id}`)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    );
  };