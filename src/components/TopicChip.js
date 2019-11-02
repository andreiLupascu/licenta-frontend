import { useStyles } from '../helpers/styles';
import TextField from "@material-ui/core/TextField";
import React from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";

export const TopicChip = props => {
    const classes = useStyles();
    const topic = props.topic;
    return <div className={classes.container}>
        <TextField
            id="topicTitle"
            label="Topic Title"
            className={classes.textField}
            value={props.topic.title}
            onChange={props.handleChange("title", props.topic.id)}
            margin="normal"
            variant="outlined"
        />
        {(topic.resolutions.map(resolution => {
            return <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="file-name">Resolution</InputLabel>
                    <Select
                        autoWidth
                        value={resolution.linkToResource ? resolution.linkToResource : "select a resolution name"}
                        onChange={props.handleChange("linkToResource", props.topic.id, resolution.id)}
                        inputProps={{
                            name: 'linkToResource',
                            id: 'resource-name',
                        }}
                    >
                        {
                            props.resolutions === undefined ?
                                JSON.parse(localStorage.getItem('resolutionLinks')).map(resolutionName => <MenuItem value={resolutionName}>{resolutionName}</MenuItem>)
                                : props.resolutions.map(resolutionName => <MenuItem value={resolutionName}>{resolutionName}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox checked={resolution.passed} onChange={props.handleChange("passed", props.topic.id, resolution.id)} />
                        }
                        label="Passed"
                    />
                </FormGroup>
            </div>
        }))}
        <span>
            <Button variant="contained" onClick={props.handleAddRes(topic.id)}>Add resolution</Button>
            <Button variant="contained" onClick={props.handleRemoveRes(topic.id)}>Remove resolution</Button>
        </span>
    </div>
}