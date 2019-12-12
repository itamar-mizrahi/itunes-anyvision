import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import AppleIcon from '@material-ui/icons/Apple';


class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.history.location.state.item
    };
  }
  
  render() {
    return (
      <Card className="card-column">
        <h1>{this.state.item.collectionName}</h1>
        <AppleIcon fontSize="large"/>
        {this.state.item.previewUrl?  (
          <Card className="card-row">
          <iframe
            title="itunes"
            src={this.state.item.previewUrl}
            height="600"
            width="1400"
          ></iframe>
          </Card>
        ) : (
          "No prevURL found"
        )}
      </Card>
    );
  }
}

export default Song;
