import React from "react";

import LoginForm from "./LoginForm";
import {CommitteePage} from "./CommitteePage";
import CommitteeGrid from "../components/CommitteeGrid";

// TODO CALL committees endpoint on app component mount
// TODO on each committee submit, submit a PUT on that committee
// files uploaded separately, names to links are returned from get
// TODO topics
// TODO newsroom
// TODO fileupload for topics and newsroom
export const App = () => {
  const items = [
    {
      name: "com 10",
      link:
        "https://stackoverflow.com/questions/384145/expanding-a-parent-div-to-the-height-of-its-children"
    },
    {
      name: "com 1"
    },
    {
      name: "com 1"
    },
    {
      name: "com 1"
    },
    {
      name: "com 1"
    },
    {
      name: "com 1"
    },
    {
      name: "com 1"
    }
  ];
  const committee = {
    name: "",
    chairPersons: "",
    events: [],
    topics: []
  };
  const handleClick = url => console.log(url); //placeholder
  return (
    <div>
      <CommitteePage committee={committee} />
    </div>
  );
}
