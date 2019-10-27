import { useStyles } from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { EventChip } from "../components/EventChip";
import { useHistory } from "react-router-dom";
import { TokenChip } from "../components/TokenChip";

export const CommitteePage = props => {
  const classes = useStyles();
  let history = useHistory();
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
    const emptyTopic = {
      id: topics.length,
      passed: false,
      linkToResource: ""
    }
    const newTopics = Object.assign([], topics);
    newTopics.push(emptyTopic)
    setTopics(newTopics);
  }
  const removeLastTopic = () => {
    const newTopics = Object.assign([{}], topics);
    newTopics.pop();
    setTopics(newTopics);
  }
  const handleTopicsChange = (element, id) => event => {
    let newTopics = Object.assign([{}], events);
    element === "selectedDate" ?
    newTopics[id][element] =
      event : newTopics[id][element] = event.target.value;
    setEvents(newTopics);
  }

  const handleSubmit = () => {
    //TODO do
    console.log('submit changes')
    history.push('/committees')
  }

  return (
    <div>
      <Button variant="contained" onClick={handleSubmit}>Submit changes</Button>
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
        <div>
          {
            topics.length === 0 || Object.keys(topics[0]) === 0
              ? null
              : topics.map(topic => (
                <TokenChip topic={topic} handleChange={handleTopicsChange} />
              ))}
        </div>
        {/* PLACEHOLDER FOR TOPICS */}
        <span>
          <Button variant="outlined" onClick={addEmptyTopic}>Add topic</Button>
          <Button variant="outlined" onClick={removeLastTopic}>Remove topic</Button>
        </span>
      </form>
    </div>
  );
};