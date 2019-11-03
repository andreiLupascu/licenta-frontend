import { useStyles } from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { EventChip } from "../components/EventChip";
import { useHistory } from "react-router-dom";
import { TopicChip } from "../components/TopicChip";
import axios from 'axios'

export const CommitteePage = props => {
  const classes = useStyles();
  let history = useHistory();
  const id = props.id;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [committee, setCommittee] = useState({
    title: props.committee.title ? props.committee.title : "",
    chairPersons: props.committee.chairPersons ? props.committee.chairPersons : [""]
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
      schedule: "",
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
      resolutions: [{
        id: 0,
        linkToResource: "",
        passed: false
      }]
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
  const handleTopicsChange = (element, id, resId) => event => {
    let newTopics = Object.assign([{}], topics);
    element === "passed" ?
      newTopics[id]['resolutions'][resId][element] = event.target.checked
      : element === "linkToResource" ?
        newTopics[id]['resolutions'][resId][element] = event.target.value
        : newTopics[id][element] = event.target.value;
    setTopics(newTopics);
  }

  const handleAddResolution = topicId => event => {
    const newTopic = topics[topicId]
    const topicResolutions = newTopic.resolutions
    topicResolutions.push({
      id: topicResolutions.length,
      linkToResource: "",
      passed: false
    })
    newTopic.resolutions = topicResolutions
    const newTopics = Object.assign([{}], topics);
    newTopics[topicId] = newTopic
    setTopics(newTopics)
  }

  const handleRemoveResolution = topicId => event => {
    const newTopic = topics[topicId]
    newTopic.resolutions.pop()
    let newTopics = Object.assign([{}], topics);
    newTopics[topicId] = newTopic
    setTopics(newTopics)
  }

  const handleSubmit = () => {
    const payload = { ...committee, events, topics, id };

    axios({
      url: BASE_URL + '/committees',
      method: 'PUT',
      data: payload,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    ).then(res => {
        alert(res.data.msg)
        props.reload();
        history.push('/committees')})
      .catch(err => console.log(err));


  }
  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleSubmit}>Submit changes</Button>
      </div>
      <br></br>
      <Button variant="contained" onClick={() => { props.reload(); history.push("/committees") }}>Back to menu</Button>
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
                <TopicChip topic={topic} handleChange={handleTopicsChange}
                  resolutions={props.resolutions}
                  handleAddRes={handleAddResolution}
                  handleRemoveRes={handleRemoveResolution} />
              ))}
        </div>
        <br></br>
        <span>
          <Button variant="outlined" onClick={addEmptyTopic}>Add topic</Button>
          <Button variant="outlined" onClick={removeLastTopic}>Remove topic</Button>
        </span>
      </form>
    </div>
  );
};