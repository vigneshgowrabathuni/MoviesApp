import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
export default class MoviesTable extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: [0], filterMovieData: [] ,mItem:{}, open: false};
    this.handleMovie = this.handleMovie.bind(this);
  }
  handleMovie(myItem){
    console.log(myItem.Title);
    this.setState({mItem:myItem, open: true});
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  render(){
    var myData = this.props.mData;
    const actions = [
      <FlatButton
      label="Close"
      primary={true}
      onClick={this.handleClose}
      />
    ];

    const customContentStyle = {
      width: '22%'
    };
    return<div>
    <Table textAlign='center' verticalAlign='middle'>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
    <TableHeaderColumn style={{ width: 100 }}>ID</TableHeaderColumn>
    <TableHeaderColumn style={{ width: 200 }}>Title</TableHeaderColumn>
    <TableHeaderColumn style={{ width: 100 }}>Year</TableHeaderColumn>
    <TableHeaderColumn style={{ width: 200 }}>Actors</TableHeaderColumn>
    <TableHeaderColumn style={{ width: 200 }}>Director</TableHeaderColumn>
    <TableHeaderColumn style={{ width: 200 }}>View Album</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {
      Object.keys(myData).map((key, index) => {
        const myItem = myData[key]
        return <TableRow  key={index+1}>
        <TableRowColumn style={{ width: 100 }}>{index+1}</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>{myItem.Title}</TableRowColumn>
        <TableRowColumn style={{ width: 100 }}>{myItem.Year}</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>{myItem.Actors}</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}>{myItem.Director}</TableRowColumn>
        <TableRowColumn style={{ width: 200 }}><RaisedButton label="View" primary={true} onClick = {this.handleMovie.bind(this, myItem)}/></TableRowColumn>
        </TableRow>
      })
    }
    </TableBody>
    </Table>
    <Dialog
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        contentStyle={customContentStyle}>
        <Card style={{width:"250px", height:"400px"}}>
            <CardMedia style={{width:"250px", height:"300px"}}>
            <img src={this.state.mItem.Poster} style={{width:"250px", height:"300px"}} alt="Movie Poster" />
            </CardMedia>
            <CardText>
            Title: {this.state.mItem.Title}

            </CardText>
        </Card>

    </Dialog>
    </div>
  }
}
