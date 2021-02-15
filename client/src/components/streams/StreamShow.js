import React from "react";
import flv from "flv.js";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    // Player is built after stream has been fetched successfully
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  renderStreamDetail() {
    return (
      <Card>
        <Card.Body>
          <video ref={this.videoRef} style={{ width: "100%" }} controls />
          <Card.Title>{this.props.stream.title}</Card.Title>
          <Card.Text>{this.props.stream.description}</Card.Text>
          <Link to="/">
            <Button variant="primary">Back to all Streams</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div className="justify-content-center m-3">
        {this.renderStreamDetail()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
