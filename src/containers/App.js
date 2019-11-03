import React, { useState, useEffect } from 'react';
import { LoginForm } from "./LoginForm";
import { CommitteePage } from "./CommitteePage";
import { CommitteeGrid } from "../components/CommitteeGrid";
import { NewsRoom } from "../containers/NewsRoom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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

  const [resolutionLinks, setResolutionLinks] = useState();
  const [newsLinks, setNewsLinks] = useState();

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
        setCommittees(res.data)
        localStorage.setItem('committees', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));

      await axios({
        url: BASE_URL + '/newsroom',
        method: 'GET',
      }
      ).then(res => {
        setArticles(res.data)
        localStorage.setItem('newsroom', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));

      await axios({
        url: BASE_URL + '/files/resolution/names',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(res => {
        setResolutionLinks(res.data)
        localStorage.setItem('resolutionLinks', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));
      await axios({
        url: BASE_URL + '/files/news-article/names',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).then(res => {
        setNewsLinks(res.data)
        localStorage.setItem('newsLinks', JSON.stringify(res.data))
      })
        .catch(err => console.log(err));
    }
    getData()

  }, [reloadPage]);
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/committees" component={() => { return <CommitteeGrid items={items} reload={reload}/> }} />
      <Route exact path="/committees/:committeeId" render={({ match }) => {
        return <CommitteePage
          reload={reload}
          committee={committees === undefined ?
            [...JSON.parse(localStorage.getItem('committees'))][match.params.committeeId[match.params.committeeId.length - 1] - 1]
            : committees[match.params.committeeId[match.params.committeeId.length - 1] - 1]}
          id={parseInt(match.params.committeeId[match.params.committeeId.length - 1])}
          resolutions={resolutionLinks} />
      }} />
      <Route exact path="/newsroom" component={() => <NewsRoom articles={articles} links={newsLinks} reload={reload} />} />

    </Switch>
  );
}

export default withRouter(App);