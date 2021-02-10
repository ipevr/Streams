import React from "react";
import { connect } from "react-redux";

const StreamEdit = (props) => {
  console.log(props);
  return (
    <div>
      <div>{props.stream.title}</div>
      <div>{props.stream.description}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps)(StreamEdit);
