import {useStyles} from '../helpers/styles'
import React, {useState} from "react";
import axios from 'axios';
import { Base64 } from "js-base64";
import {CredentialFields} from "../components/CredentialFields";
import {LoginButton} from "../components/LoginButton";
import {useHistory} from "react-router-dom"
export const LoginForm = () => {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({
      username: "",
      password: ""
    });
    let history = useHistory();
    const handleStateChange = element => event => {
      setCredentials({ ...credentials, [element]: event.target.value });
    };
  
    const handleLogin = async () => {
      return await axios({
        url: "http://localhost:5000/api/auth/login",
        method: "post",
        data: {
          credentials: Base64.encode(
            credentials.username + ":" + credentials.password
          )
        }
      })
        .then(res => {
          localStorage.setItem('token', res.data.access_token)
          history.push('/committees')
        })
        .catch(error => alert(error));
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