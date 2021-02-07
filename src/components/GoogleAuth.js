import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    }

    return (
      <button
        onClick={() =>
          this.state.isSignedIn ? this.auth.signOut() : this.auth.signIn()
        }
        type="button"
        className={`btn ${
          this.state.isSignedIn ? "btn-secondary" : "btn-primary"
        }`}
      >
        <i class="fab fa-google"></i>
        {this.state.isSignedIn ? " Sign Out" : "  Sign In"}
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
