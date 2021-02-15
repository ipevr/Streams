import React from "react";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div className="alert alert-danger p-1 mt-1">{error}</div>;
    }
    return null;
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <Form.Group>
        <Form.Label className="font-weight-bold">{label}</Form.Label>
        <Form.Control {...input} autoComplete="off" />
        {this.renderError(meta)}
      </Form.Group>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title!";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description!";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
