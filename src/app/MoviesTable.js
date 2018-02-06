import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
export default class MoviesTable extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: [0], filterMovieData: [] ,mItem:{}, open: false};
    this.handleMovie = this.handleMovie.bind(this);
  }
  handleMovie(myItem){
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
    const customContentStyle = {
      width: '25%'
    };
    return<div>
    <Table textAlign='center' verticalAlign='middle'>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    <TableRow>
    <TableHeaderColumn >ID</TableHeaderColumn>
    <TableHeaderColumn >Title</TableHeaderColumn>
    <TableHeaderColumn className="hidden-xs">Year</TableHeaderColumn>
    <TableHeaderColumn className="hidden-xs">Actors</TableHeaderColumn>
    <TableHeaderColumn className="hidden-xs">Director</TableHeaderColumn>
    <TableHeaderColumn >View Album</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {
      Object.keys(myData).map((key, index) => {
        const myItem = myData[key]
        return <TableRow  key={index+1}>
        <TableRowColumn >{index+1}</TableRowColumn>
        <TableRowColumn >{myItem.Title}</TableRowColumn>
        <TableRowColumn className="hidden-xs">{myItem.Year}</TableRowColumn>
        <TableRowColumn className="hidden-xs">{myItem.Actors}</TableRowColumn>
        <TableRowColumn className="hidden-xs">{myItem.Director}</TableRowColumn>
        <TableRowColumn ><RaisedButton label="View" primary={true} onClick = {this.handleMovie.bind(this, myItem)}/></TableRowColumn>
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
        <Card style={{width:"30dp", height:"60dp"}}>
          <CardMedia style={{width:"30dp", height:"60dp"}}>
            <img src={this.state.mItem.Poster} style={{width:"30dp", height:"60dp"}} alt="Movie Poster" />
          </CardMedia>
          <CardText>
            Title: {this.state.mItem.Title}
          </CardText>
        </Card>
      </Dialog>
    </div>
  }
}
