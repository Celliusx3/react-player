import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import Appbar from '../components/Appbar';
import {
  useHistory,
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  base: {
    toolbar: theme.mixins.toolbar,
    paddingTop: theme.spacing(2)
  },
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperSelected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default
  }
}));

export default function SearchScreen() {

  let { id } = useParams();
  let history = useHistory();


  const classes = useStyles();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("看戏吧");


  useEffect(() => {
    if (list == null || list.length <= 0) {
      fetch(`https://api.eyunzhu.com/api/vatfs/resource_site_collect/search?kw=${id}&per_page=50&page=1`)
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
          setList(result.data.data)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
    }
  });

  const renderList = () =>  {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          { list!= null ? list.map((value,index) => {
            return (
              <Grid key={value.vid} item xs={1}>
                <Paper onClick={() =>  {history.push(`/details/${value.vid}`)}} variant="outlined" className={`${classes.paper}`}>
                  {value.name}
                </Paper>
              </Grid>
            )
          }): <div></div>}
        </Grid>
      </div>
    )
  }

  return (
    <div>
      <Appbar title= {title} onSearchButtonClicked = {(text) => {history.push(`/search/${text}`)}}/>
      <div className={classes.base}>
        {renderList()}
      </div>
    </div>
  );
}