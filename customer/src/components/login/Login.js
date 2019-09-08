import React, { Component } from 'react'
// import { login } from './UserFunctions'
import axios from 'axios'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    const url = 'http://localhost:3000/auth';
    return axios.post(url, {
      username: user.username,
      password: user.password
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
   }

  render() {
    return (
      <div className="container shadow component rounded col-sm-10 col-md-6 p-5 my-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal h1 text-center">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="username">username </label>
                <input
                  type="username"
                  className="form-control form-styling"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control form-styling"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-block btn-signin btn-animate col-md-6 col-sm-8 col-sm-2 offset-md-3 "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
