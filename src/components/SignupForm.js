import React, { Component } from "react"
import { Redirect } from "react-router"
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react"

class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    hasError: false,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()
    // fetch('http://localhost:3000/api/v1/users', {
    fetch("https://api.waxchromatics.com/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          discogs_id: "0",
          oauth_token: "0",
          oauth_token_secret: "0",
          name: "0",
          wax_username: this.state.wax_username,
        },
      }),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.jwt) {
          this.setState({ hasError: true })
        } else {
          console.log("success", result)
          this.props.updateUsername(result.user.wax_username)
          // clear any previous user login info and set new info
          localStorage.clear()
          const userInfo = {
            username: result.user.wax_username,
            discogs_id: result.user.discogs_id,
            name: result.user.name,
            oauth_token: result.user.oauth_token,
            oauth_token_secret: result.user.oauth_token_secret,
            token: result.jwt,
            id: result.user.id,
            wantlist: result.wantlist,
            collection: result.collection,
          }
          localStorage.setItem("waxUser", JSON.stringify(userInfo))
          this.props.userLoggedIn()
        }
      })
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Create your account
          </Header>
          {this.state.hasError ? (
            <Message
              negative
              header="There was an error creating your account:"
              list={[
                "That email or username is already in use, please try again.",
              ]}
            />
          ) : null}
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="wax_username"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />

              <Button color="black" fluid size="large">
                Create Account
              </Button>
            </Segment>
          </Form>
          <Message>
            Already an existing user? <a href="/login">Log in</a>
          </Message>
          {this.props.loggedIn ? <Redirect to="/profile" /> : null}
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignupForm
