import {useStyles} from '../helpers/styles'
import TextField from "@material-ui/core/TextField";
import React from "react";

export const CredentialFields = props => {
    const classes = useStyles();
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={props.credentials.username}
          onChange={props.handleChange("username")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          value={props.credentials.password}
          onChange={props.handleChange("password")}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  };