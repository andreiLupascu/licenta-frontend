import {useStyles} from '../helpers/styles'
import TextField from "@material-ui/core/TextField";
import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const EventChip = props => {
    const classes = useStyles();
    return Object.keys(props).length === 0 ? null : (
      <div className={classes.container}>
        <TextField
          id="eventTitle"
          label="Event Title"
          className={classes.textField}
          value={props.event.title}
          onChange={props.handleChange("title", props.event.id)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="eventLocation"
          label="Event Location"
          className={classes.textField}
          value={props.event.location}
          onChange={props.handleChange("location", props.event.id)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="eventSchedule"
          label="Event Schedule"
          helperText="format: 10:55-11:31, altfel crapa :D"
          className={classes.textField}
          value={props.event.schedule}
          onChange={props.handleChange("schedule", props.event.id)}
          margin="normal"
          variant="outlined"
          multiline
        />
        <TextField
          multiline
          fullWidth
          id="eventDescription"
          label="Event Description"
          className={classes.textField}
          value={props.event.description}
          onChange={props.handleChange("description", props.event.id)}
          margin="normal"
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Event date"
            value={props.event.selectedDate}
            onChange={props.handleChange("selectedDate", props.event.id)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  };