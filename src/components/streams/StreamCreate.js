import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput({ input, label }) {
    return (
      <div className="mb-3">
        <label className="form-label fw-bold">{label}</label>
        <input {...input} className="form-control" />
      </div>
    );
  }

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="container mt-3"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate",
})(StreamCreate);
