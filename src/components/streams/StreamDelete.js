import React from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onModalDismiss = () => {
    history.push("/");
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const actions = (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.onModalDismiss}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </React.Fragment>
    );

    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={`Are you sure you want to delete the stream ${this.props.stream.title}?`}
          actions={actions}
          onDismiss={this.onModalDismiss}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
