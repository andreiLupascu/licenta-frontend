import { useStyles } from '../helpers/styles'
import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router-dom"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
export const CommitteeGrid = props => {
  const classes = useStyles();
  let history = useHistory();
  return (
    <div>
      <div className={classes.gridParent}>
        {props.items.map(item => (
          <Button variant="contained"
            className={classes.gridChild}
            onClick={() => item.id === "newsroom" ? history.push('/newsroom') : history.push(`/committees/committeeId=${item.id}`)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <FilePond server="http://localhost:5001/api/files/upload?resolution=true"
        name="file"
        labelFileProcessingError="Invalid file."
        labelIdle='Upload resolution .pdf file (name is important)'
        onprocessfile={(error, file) => { error ? console.log() : console.log(JSON.parse(file.serverId)['fileLocation']) }} />
    </div>
  );
};