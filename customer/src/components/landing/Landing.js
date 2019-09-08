import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'
// import { search } from './CustomerFunctions'
import axios from 'axios'


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      account_number:'',
      esn_number:'',
      mac_address:'',
      first_name:'',
      last_name:'',
      email:'',
      zip_code:'',
      errors: {},
      results: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onSubmit(e) {
    e.preventDefault()
    const customer = {
      account_number:this.state.account_number,
      esn_number:this.state.esn_number,
      mac_address:String(this.state.mac_address),
      first_name:String(this.state.first_name),
      last_name:String(this.state.last_name),
      email:String(this.state.email),
      zip_code:String(this.state.zip_code)
    }
    //check if inputs are empty 
    if (!customer.account_number) {
      customer.account_number=0;
    }
    if (!customer.esn_number) {
      customer.esn_number=0;
    }

    const url = `http://localhost:8080/search?account_number=${customer.account_number}&esn_number=${customer.esn_number}&mac_address=${customer.mac_address}&first_name=${customer.first_name}&last_name=${customer.last_name}&email=${customer.email}&zip_code=${customer.zip_code}`;    
    console.log(encodeURI(url))
    return axios.get(encodeURI(url))
    .then(response =>this.setState({results:response.data.data.recordsets[0]}))
    .then(response => 
      this.props.history.push({
        pathname : '/search',
        state :this.state.results
        } 
      ))
    .catch(err => console.error(err))
    
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className=" shadow component rounded p-5 col-sm-10 col-md-6 mt-4 ">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 text-center mb-3 font-weight-normal h1" >Search Customer</h1>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="account_number"
                  placeholder="Enter your account number"
                  value={this.state.account_number}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="esn_number"
                  placeholder="Enter essn number"
                  value={this.state.esn_number}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="mac_address"
                  placeholder="Enter mac_address  : "
                  value={this.state.mac_address}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-styling text-center"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-styling text-center"
                  name="zip_code"
                  placeholder="zip_code" 
                  value={this.state.zip_code}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-block btn-animate btn-signin col-sm-8 offset-sm-2 col-md-6 offset-md-3"
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
