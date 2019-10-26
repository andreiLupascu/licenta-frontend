import {useStyles} from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React from "react";

export const LoginButton = props => {
    const classes = useStyles();
    return (
      <div>
        <Button
          variant="contained"
          className={classes.button}
          onClick={props.onClick}
        >
          Log in
        </Button>
      </div>
    );
  };
  