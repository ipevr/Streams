import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDismiss = () => {
    history.push("/");
  };

  onConfirm = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const actions = (
      <React.Fragment>
        <Button variant="secondary" onClick={this.onDismiss}>
          Cancel
        </Button>
        <Button variant="danger" onClick={this.onConfirm}>
          Delete
        </Button>
      </React.Fragment>
    );

    return (
      <div>
        <Modal
          title="Delete Stream"
          content={`Are you sure you want to delete the stream ${this.props.stream.title}?`}
          actions={actions}
          onDismiss={this.onDismiss}
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
