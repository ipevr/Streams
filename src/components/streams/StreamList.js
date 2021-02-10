import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <li key={stream.id} className="list-group-item d-flex">
          <i
            className="bi bi-camera-reels-fill me-3"
            style={{ fontSize: "2rem" }}
          ></i>
          <div>
            <h4>{stream.title}</h4>
            <p>{stream.description}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h2>Streams:</h2>
        <ul className="list-group list-group-flush">{this.renderList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
