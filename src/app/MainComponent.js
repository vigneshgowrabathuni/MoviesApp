import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, Grid} from 'material-ui/GridList';
import axios from 'axios';
import MoviesTable from './MoviesTable';

export default class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = { total_pages:0, mTitles:[], errorStr:'hi', mTitle:'',selected: [0]};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    if(e.target.value.length>0){
      this.setState(
        { mTitle : e.target.value}
      );
    }else{
      this.setState(
        { mTitles : []}
      );
    }
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.mTitle);
    // let url = "https://jsonmock.hackerrank.com/api/movies/search/?Title="+this.state.mTitle;
    let url = "http://www.omdbapi.com/?s="+this.state.mTitle;
    var _this = this;
    axios.get(url+"&apikey=36e916d5")
    .then(function(res){
      let data = res['data'];
      var totalResults = (parseInt(data['totalResults']))/10;
      let total_pages = Math.ceil(totalResults);
      var moviesData = [];
      var __this = _this;

      for(var i=1;i<=total_pages;i++){
        axios.get(url+"&page="+i+"&apikey=36e916d5")
        .then(function(res){
          var mData = res['data']['Search'];
          // moviesData = moviesData.concat(mData);
          // __this.setState({mTitles: moviesData});
          mData.forEach((d)=>{
            axios.get("http://www.omdbapi.com/?i="+d.imdbID+"&apikey=36e916d5")
            .then(function(res){
              moviesData.push(res.data);
              // moviesData = moviesData.concat(mData);
              __this.setState({mTitles: moviesData});
            })
            .catch(function (error) {
              console.log(error);
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    // var myData = this.state.mTitles;
    // console.log(myData);
    return (
      <div>
      <AppBar style={{textAlign : 'center'}} showMenuIconButton = {false} title="😀" />
      <Paper zDepth={2}
      style = {{padding: '10px', margin: '10px 100px'}}>
      <div style = {{ textAlign: 'center'}}>
      <TextField hintText="Enter Movie Name" onChange={this.handleChange}/><br />
      <RaisedButton label="Search" primary={true} onClick={this.handleSubmit}/>
      </div>
      <hr />
      <MoviesTable mData={this.state.mTitles} />
      </Paper>
      </div>
    );
  }
}



// <List>
// {
//   Object.keys(myData).map((key, index) => {
//     const myItem = myData[key]
//     return <ListItem key={index} primaryText={myItem.Title}  />
//   })
// }
// </List>

// <GridList container spacing={24}>
// {
//   Object.keys(myData).map((key, index) => {
//     const myItem = myData[key]
//     return
//     <Grid item xs={6} sm={3}>
//
//   <Card key={index} >
//   <CardMedia
//     overlay={<CardTitle title={myItem.Title}/>}
//   >
//     <img src={myItem.Poster} alt="image" />
//   </CardMedia>
//   <CardTitle title={myItem.Title} />
//   <CardText>
//   Year: {myItem.Year}
//   imdbID: {myItem.imdbID}
//   Type: {myItem.Type}
//   </CardText>
// </Card>
// </Grid>
//   })
// }
//
// </GridList>
