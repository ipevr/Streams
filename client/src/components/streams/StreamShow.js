import React from "react";
import { Card, Container, Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream } from "../../actions";
import playButton from "../../images/play-button.png";

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderStreamDetail() {
    return (
      <Card>
        <Card.Body>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ height: "300px" }}
          >
            <Image src={playButton} style={{ height: "100px" }} />
          </Container>
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
