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

export default function DetailsScreen() {
  let { id } = useParams();
  let history = useHistory();

  const classes = useStyles();
  const [playPosition, setPlayPosition] = useState(0);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("看戏吧");


  useEffect(() => {
    if (list == null || list.length <= 0) {
      fetch(`https://api.eyunzhu.com/api/vatfs/resource_site_collect/getVDetail?vid=${id}`)
      .then(response => response.json())
      .then(
        (result) => {
          const plays = Object.keys(result.data.playUrl).map(function(key) {
            return {
              "title": key,
              "url":  result.data.playUrl[key]
            }
          }).reverse()

          setList(plays)
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

  const renderPlayer = () => {
    return (
      <div className='player-wrapper' style= {{width: "75%", position: "relative", paddingTop:"37.5%", alignSelf:"center"}}>
        <ReactPlayer
          style= {{position: "absolute", top: 0,
           left: "50%", /* position the left edge of the element at the middle of the parent */
            transform: "translateX(-32.5%)"}}
          className='react-player'
          playing
          url={list[playPosition]  == null ?"": list[playPosition].url }
          controls
          width='100%'
          height='100%'
          config={{ file: {
            attributes: {
              crossOrigin: 'true'
            }
          }}}      
        />
      </div>
    )
  }

  const renderList = () =>  {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          { list!= null ? list.map((value,index) => {
            return (
              <Grid key={value.title} item xs={1}>
                <Paper onClick={() => setPlayPosition(index) } variant="outlined" className={`${classes.paper} ${playPosition == index ? classes.paperSelected: null}`}>
                  {value.title}
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
        {renderPlayer()}
        {renderList()}
      </div>
    </div>
  );
}