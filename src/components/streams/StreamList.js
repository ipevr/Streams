import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.userId === stream.userId) {
      return (
        <>
          <Link to={`streams/edit/${stream.id}`} className="mr-3">
            <Button variant="primary" size="lg">
              Edit
            </Button>
          </Link>
          <Link to={`streams/delete/${stream.id}`}>
            <Button variant="danger" size="lg">
              Delete
            </Button>
          </Link>
        </>
      );
    }
    return null;
  }

  renderAdminCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className="d-flex justify-content-end">
          <Link to="/streams/new">
            <Button variant="secondary" size="lg">
              Create new stream
            </Button>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <ListGroup.Item
          key={stream.id}
          className="d-flex align-items-center pr-0"
        >
          <i
            className="bi bi-camera-reels-fill mr-3"
            style={{ fontSize: "2rem" }}
          ></i>
          <div className="flex-fill">
            <h4>{stream.title}</h4>
            <p className="mb-0">{stream.description}</p>
          </div>
          {this.renderAdmin(stream)}
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <Container fluid>
        <h2>Streams:</h2>
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          {this.renderList()}
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
        {this.renderAdminCreate()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    userId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
