import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      account_number:'',
      essn_number:'',
      mac:'',
      first_name:'',
      last_name:'',
      email:'',
      zip:'',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onSubmit(e) {
    e.preventDefault()
    const customer = {
      account_number:this.state.account_number,
      essn_number:this.state.essn_number,
      mac:this.state.mac,
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      email:this.state.email,
      zip:this.state.zip
    }
      this.props.history.push(`/customers/search?account_number='${customer.account_number}'&essn_number='${customer.essn_number}'&mac='${customer.mac}'&first_name='${customer.first_name}'&last_name='${customer.last_name}'&email='${customer.email}'&zip='${customer.zip}'`)

    
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5 mx-2">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Search Customer</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="account_number"
                  placeholder="Enter your account number"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="essn_number"
                  placeholder="Enter essn number"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="mac_adress"
                  placeholder="Enter mac adress : "
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  placeholder="zip code" 
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                search 
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
