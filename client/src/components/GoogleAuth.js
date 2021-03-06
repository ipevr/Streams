import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.auth.isSignedIn.listen(this.onAuthChange);
          this.onAuthChange(this.auth.isSignedIn.get());
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }

    return (
      <Button
        onClick={() =>
          this.props.isSignedIn ? this.auth.signOut() : this.auth.signIn()
        }
        variant={`${this.props.isSignedIn ? "secondary" : "primary"}`}
      >
        <i className="fab fa-google"></i>
        {this.props.isSignedIn ? " Sign Out" : "  Sign In"}
      </Button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
