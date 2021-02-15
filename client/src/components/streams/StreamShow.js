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
    this.props.fetchStream(this.props.match.params.id);
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
