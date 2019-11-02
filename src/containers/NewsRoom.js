import { useStyles } from '../helpers/styles'
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import axios from 'axios';
export const NewsRoom = props => {

    const classes = useStyles();
    let history = useHistory();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [articles, setArticles] = useState(props.articles===undefined? JSON.parse(localStorage.getItem('newsroom')):props.articles);
    

    const links = props.links===undefined? JSON.parse(localStorage.getItem('newsLinks')):props.links;

    const handleNameChange = id => event =>{
        let newArticles = Object.assign([{}], articles);
        newArticles[id-1]['title']=event.target.value;
        setArticles(newArticles);
    }

    const handleArticleChange = id => event =>{
        let newArticles = Object.assign([{}], articles);
        newArticles[id-1]['uri']=event.target.value;
        setArticles(newArticles);
    }

    const handleSubmit = () => {
        axios({
          url: BASE_URL + '/newsroom',
          method: 'PUT',
          data: articles,
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
        <div >
            <div>
            <Button variant="outlined" onClick={handleSubmit}>Submit Changes</Button>
            </div>
            <br></br>
            <Button variant="outlined" onClick={() => {props.reload(); history.push("/committees")}}>Back to menu</Button>
            
            <div className={classes.container}>
            {articles.map(article => {
                return (
                    <span className={classes.containerNoWrap}>
                        <TextField
                            id="title"
                            label="title"
                            className={classes.textField}
                            value={article.title}
                            onChange={handleNameChange(article.id)}
                            margin="normal"
                            variant="outlined"
                        />
                        {article.tags.length === 0? null : 
                        <TextField
                            disabled
                            id="tags"
                            label="tags"
                            className={classes.textField}
                            value={article.tags}
                            margin="normal"
                            variant="outlined"
                        />}
                        <FormControl className={classes.formControl}>
                            <InputLabel>Select a file</InputLabel>
                            <Select
                                variant="standard"
                                value={article.uri}
                                onChange={handleArticleChange(article.id)}
                                inputProps={{
                                    name: 'uri',
                                    id: 'article-name',
                                }}
                            >
                                {links.map(value => {
                                    return <MenuItem value={value}>{value}</MenuItem>;
                                })}
                            </Select>
                        </FormControl>
                    </span>
                );
            })}
            </div>
        </div>
    );
};
