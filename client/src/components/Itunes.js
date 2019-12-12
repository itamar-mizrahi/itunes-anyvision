import React, { Component } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import AppleIcon from '@material-ui/icons/Apple';
import SearchIcon from '@material-ui/icons/Search';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
class Itunes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextFieldValue: "",
      results: [],
      resultsTopTen: []
    };
  }

  onTextFieldChange = e => {
    this.setState({ TextFieldValue: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${this.state.TextFieldValue}&limit=25`
    );
    this.setState({ results: response.data.results, resultsTopTen: [] });
    axios.post("/api/songs/insertSong", {
      songName: this.state.TextFieldValue
    });
  };

  buildResultItem = () => {
    return this.state.results.map(item => {
      return (
        <Card
          className="song"
          onClick={e =>
            this.props.history.push(`/itunes/${item.trackId}`, { item })
          }
        >
          {item.collectionName}
        </Card>
      );
    });
  };

  buildResultTopTen = () => {
    return this.state.resultsTopTen.map(item => {
      return <Card className="songTopTen">
         {item.songName} ,  {item.songCounter}
         </Card>;
    });
  };

  getTopTen = async e => {
    e.preventDefault();
    const response = await axios.get("/api/songs/top10");
    console.log(response.data.list)
    this.setState({ resultsTopTen: response.data.list, results: [] });
  };

  render() {
    return (
      <div>
      <Card className="card-column">
      <h1>Itunes </h1>
      <AppleIcon className="apple" fontSize="large"/>
      <h4> Videos And Songs</h4>
      </Card>
      
      <form onSubmit={this.onSubmit}>
        <Card className="card-row">
          <TextField id="outlined-basic" label="Enter here" variant="outlined" placeholder="Enter here" onChange={this.onTextFieldChange}></TextField>
          <Button disabled={!this.state.TextFieldValue} variant="contained" color="primary" type="submit"><SearchIcon/> Search</Button>
          <Button variant="contained" color="primary" onClick={this.getTopTen}> <ThumbUpIcon/> Top 10</Button>
        </Card>
        </form>
              <Card className="card-column">
              {this.state.results.length > 0 && this.buildResultItem()}
              {this.state.resultsTopTen.length > 0 && this.buildResultTopTen()}
              </Card>
       </div>
    );
  }
}

export default Itunes;
