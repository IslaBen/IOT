import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'
import axios from 'axios'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    const url = 'http://localhost:3000/register';    
    return axios
    .post(url, {
      username: user.username,
      password: user.password
    })
    .then(response => {

      console.log(response)
      this.props.history.push({
        pathname : '/',
        })        
    })
    .catch(err => {
      console.log(err)
    })

  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="username">username </label>
                <input
                  type="username"
                  className="form-control"
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
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }}

export default Register
