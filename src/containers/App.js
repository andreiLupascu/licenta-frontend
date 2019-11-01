import React, { useState, useEffect, useCallback } from 'react';
import { LoginForm } from "./LoginForm";
import { CommitteePage } from "./CommitteePage";
import { CommitteeGrid } from "../components/CommitteeGrid";
import { NewsRoom } from "../containers/NewsRoom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  withRouter
} from "react-router-dom";
import axios from "axios";
// TODOS:
// CALL SUBMIT BUTTONS IMPLEMENTED
// AUTH HEADERS IN SUBMITS + FILEPONDS
// LOGOUT BUTTON
// REDIRECT TO LOGIN IF AUTH EXPIRED/ NO AUTH IN LS.
const App = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const items = [
    {
      name: "Committee 1",
      id: 1
    },
    {
      name: "Committee 2",
      id: 2
    },
    {
      name: "Committee 3",
      id: 3
    },
    {
      name: "Committee 4",
      id: 4
    },
    {
      name: "Committee 5",
      id: 5
    },
    {
      name: "Committee 6",
      id: 6
    },
    {
      name: "Newsroom",
      id: "newsroom"
    }
  ];
  const [committees, setCommittees] = useState()
  const resolutionLinks = [
    "5d5afd45d42c0_2.pdf",
    "response.pdf"
  ]

  const newsLinks = [
    "5d5afd45d42c0_2.pdf",
    "response.pdf"
  ];

  const [articles, setArticles] = useState()

  const [reloadPage, doReloadPage] = useState(1)
  const reload = () => doReloadPage(!reloadPage)
  useEffect(() => {
    const getData = async () => {
      await axios({
        url: BASE_URL + '/committees',
        method: 'GET',
      }
      ).then(res => {
        console.log("APEEEEEEEEEEEEEEEL")
        setCommittees(res.data)
        localStorage.setItem('committees', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));

      await axios({
        url: BASE_URL + '/newsroom',
        method: 'GET',
      }
      ).then(res => {
        console.log("NEWSROOOOOOOOOOOOOOOM")
        setArticles(res.data)
        localStorage.setItem('newsroom', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));
    }
    getData()

  }, [reloadPage]);
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/committees" component={() => { return <CommitteeGrid items={items} /> }} />
      <Route exact path="/committees/:committeeId" render={({ match }) => {
        console.log(match.params.committeeId[match.params.committeeId.length - 1])
        return <CommitteePage
          reload={reload}
          committee={committees === undefined ?
            [...JSON.parse(localStorage.getItem('committees'))][match.params.committeeId[match.params.committeeId.length - 1] - 1]
            : committees[match.params.committeeId[match.params.committeeId.length - 1] - 1]}
          id={match.params.committeeId}
          resolutions={resolutionLinks} />
      }} />
      <Route exact path="/newsroom" component={() => <NewsRoom articles={articles} links={newsLinks} reload={reload}/>} />

    </Switch>
  );
}

export default withRouter(App);