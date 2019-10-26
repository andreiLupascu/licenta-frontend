import {useStyles} from '../helpers/styles'
import React, {useState} from "react";
import axios from 'axios';
import { Base64 } from "js-base64";
import {CredentialFields} from "../components/CredentialFields";
import {LoginButton} from "../components/LoginButton";

export const LoginForm = () => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });
  
    const handleStateChange = element => event => {
      setCredentials({ ...credentials, [element]: event.target.value });
    };
  
    const handleLogin = async () => {
      return await axios({
        url: "http://localhost:3001/ap1/test",
        method: "post",
        data: {
          credentials: Base64.encode(
            credentials.username + ":" + credentials.password
          )
        }
      })
        .then(res => {
          return res.data;
        })
        .catch(error => console.log(error));
    };
  
    return (
      <div className={classes.container}>
        <CredentialFields
          handleChange={handleStateChange}
          credentials={credentials}
        />
        <LoginButton onClick={handleLogin} />
      </div>
    );
  };