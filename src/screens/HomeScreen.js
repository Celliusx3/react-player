import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Appbar from '../components/Appbar';
import {useHistory, useParams} from "react-router-dom";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  base: {
    toolbar: theme.mixins.toolbar,
    padding: theme.spacing(2)
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

export default function HomeScreen() {

  let history = useHistory();


  const classes = useStyles();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("看戏吧");

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
          <Paper variant="outlined" className={`${classes.paper}`}>
            <Typography variant="h6" >
              {"运用搜索开始吧！"}
            </Typography>
          </Paper>          
      </div>
    </div>
  );
}