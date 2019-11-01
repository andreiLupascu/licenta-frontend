import { useStyles } from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
export const CommitteeGrid = props => {
  const classes = useStyles();
  let history = useHistory();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  return (
    <div>
      <div className={classes.gridParent}>
        {props.items.map(item => (
          <Button variant="contained"
            key={item.id}
            className={classes.gridChild}
            onClick={() => item.id === "newsroom" ? history.push('/newsroom') : history.push(`/committees/committeeId=${item.id}`)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <FilePond

        server={{
          url: BASE_URL+ "/files/upload",
          process: {
            url: "?resolution=true",
            method: "POST",
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        }}

        name="file"
        labelFileProcessingError="Invalid file."
        labelIdle='Upload RESOLUTION .pdf file (name is important)'
        onprocessfile={(error, file) => { error ? console.log() : console.log(JSON.parse(file.serverId)['fileLocation']) }} />
      <FilePond
        server={{
          url: BASE_URL+ "/files/upload",
          process: {
            url: "?news-article=true",
            method: "POST",
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        }}
        name="file"
        labelFileProcessingError="Invalid file."
        labelIdle='Upload NEWS-ARTICLE .pdf file (name is important)'
        onprocessfile={(error, file) => { error ? console.log() : console.log(JSON.parse(file.serverId)['fileLocation']) }} />
    </div>
  );
};