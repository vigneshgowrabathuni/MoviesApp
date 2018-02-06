import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import axios from 'axios';
import MoviesTable from './MoviesTable';

export default class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = { total_pages:0, mTitles:[], mTitle:''};
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
          mData.forEach((d)=>{
            axios.get("http://www.omdbapi.com/?i="+d.imdbID+"&apikey=36e916d5")
            .then(function(res){
              moviesData.push(res.data);
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
    return (
      <div>
        <AppBar style={{textAlign : 'center'}} showMenuIconButton = {false} title="Movie Search" />
          <Card>
            <Paper zDepth={2}>
              <div style = {{ textAlign: 'center'}}>
                <TextField hintText="Enter Movie Name" onChange={this.handleChange}/><br />
                <RaisedButton label="Search" primary={true} onClick={this.handleSubmit}/>
              </div>
              <hr />
              <MoviesTable mData={this.state.mTitles} />
            </Paper>
          </Card>
        </div>
    );
  }
}
