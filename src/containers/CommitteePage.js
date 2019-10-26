import { useStyles } from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { EventChip } from "../components/EventChip";

export const CommitteePage = props => {
  const classes = useStyles();

  const [committee, setCommittee] = useState({
    title: props.committee.title ? props.committee.title : "",
    chairPersons: props.committee.chairPersons
      ? props.committee.chairPersons
      : [""]
  });
  const handleCommitteeChange = element => event => {
    setCommittee({ ...committee, [element]: event.target.value });
  };
  const [events, setEvents] = useState(
    props.committee.events ? props.committee.events : []
  );

  const handleEventsChange = (element, id) => event => {
    let newEvents = Object.assign([{}], events);
    element === "selectedDate" ?
      newEvents[id][element] =
      event : newEvents[id][element] = event.target.value;
    setEvents(newEvents);
  }
  const addEmptyEvent = () => {
    const emptyEvent =
    {
      id: events.length,
      selectedDate: Date.now(),
      schedule: [""],
      title: "",
      location: "",
      description: ""
    }
    const newEvents = Object.assign([], events);
    newEvents.push(emptyEvent)
    setEvents(newEvents);
  }
  const removeLastEvent = () => {
    const newEvents = Object.assign([], events);
    newEvents.pop();
    setEvents(newEvents);
  }
  const [topics, setTopics] = useState(
    props.committee.topics ? props.committee.topics : []
  );


  const addEmptyTopic = () => {
    const emptyEvent = {
      id: events.length,
      selectedDate: Date.now(),
      schedule: [""],
      title: "",
      location: "",
      description: ""
    }
    const newTopics = Object.assign([], topics);
    newTopics.push(emptyEvent)
    setTopics(newTopics);
  }

  const removeLastTopic = () => {
    const newTopics = Object.assign([{}], topics);
    newTopics.pop();
    setTopics(newTopics);
  }

  return (
    console.log(events),
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="title"
        label="Title"
        className={classes.textField}
        value={committee.title}
        onChange={handleCommitteeChange("title")}
        margin="normal"
        variant="outlined"
      />
      <TextField
        disabled
        id="chairPersons"
        label="Chair Persons"
        className={classes.textField}
        value={committee.chairPersons}
        onChange={handleCommitteeChange("chairPersons")}
        margin="normal"
        variant="outlined"
      />
      <div>
        {
          events.length === 0 || Object.keys(events[0]) === 0
            ? null
            : events.map(event => (
              <EventChip event={event} handleChange={handleEventsChange} />
            ))}
      </div>
      <span>
        <Button variant="outlined" onClick={addEmptyEvent}>Add event</Button>
        <Button variant="outlined" onClick={removeLastEvent}>Remove event</Button>
      </span>

      {/* PLACEHOLDER FOR TOPICS */}
      <span>
        <Button variant="outlined" onClick={addEmptyTopic}>Add topic</Button>
        <Button variant="outlined" onClick={removeLastTopic}>Remove topic</Button>
      </span>
    </form>
  );
};