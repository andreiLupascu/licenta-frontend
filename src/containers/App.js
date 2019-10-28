import React from "react";

import { LoginForm } from "./LoginForm";
import { CommitteePage } from "./CommitteePage";
import { CommitteeGrid } from "../components/CommitteeGrid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
// TODO CALL committees endpoint on app component mount
// TODO on each committee submit, submit a PUT on that committee
// files uploaded separately, names to links are returned from get
// TODO topics
// TODO newsroom
// TODO fileupload for topics and newsroom
export const App = () => {


  const items = [
    {
      name: "com 1",
      id: 1
    },
    {
      name: "com 2"
    },
    {
      name: "com 3"
    },
    {
      name: "com 4"
    },
    {
      name: "com 5"
    },
    {
      name: "com 6"
    },
    {
      name:"newsroom",
      id: "newsroom"
    }
  ];
  const committee = {
    name: "",
    chairPersons: "",
    events: [],
    topics: []
  };
  
  return (
    <Router>
      <Switch>
        <Route exact path="/committees" component={()=> <CommitteeGrid items={items}/>} />
        <Route exact path="/committees/:committeeId" render={({match}) =>{
          return <CommitteePage committee={committee} id={match.params.committeeId}/> }} />
        <Route exact path="/" component={LoginForm} />
      </Switch>
    </Router>
  );
}
