import React from "react";
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
        <div>
          <Link
            to={`streams/edit/${stream.id}`}
            className="btn btn-primary m-1"
          >
            Edit
          </Link>
          <button className="btn btn-danger ms-1">Delete</button>
        </div>
      );
    }
    return null;
  }

  renderAdminCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className="d-flex justify-content-end">
          <Link to="/streams/new" className="btn btn-secondary">
            Create new stream
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <li key={stream.id} className="list-group-item d-flex pe-0">
          <i
            className="bi bi-camera-reels-fill me-3 align-self-start"
            style={{ fontSize: "2rem" }}
          ></i>
          <div className="align-self-start flex-fill">
            <h4>{stream.title}</h4>
            <p>{stream.description}</p>
          </div>
          {this.renderAdmin(stream)}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h2>Streams:</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex"></li>
          {this.renderList()}
          <li className="list-group-item d-flex"></li>
        </ul>
        {this.renderAdminCreate()}
      </div>
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
