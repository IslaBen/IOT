import React, { Component } from 'react'
// import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
        super(props)                
        // this.handleShow = this.handleShow.bind(this);
        this.state = {
        customers:[]
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        // console.log(e.target.value)
        this.props.history.push({
            pathname : '/customer/'+e.target.value,
            state :e.target.email
            })        
        }
                      
    componentDidMount() {
        this.setState({customers:this.props.location.state})
    }
  render() {
     const handleClick = this.handleClick;
      console.log(this.props.location.state)
    return (
<div class="container-fluid">
	<div class="row">
	    <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2 border-right">
		                    <h4>Customers:</h4>
                        </div>

                    </div>
		            <div class="row">
		                <div class="col-md-12">
		                    <table class="table table-hover ">
                                <thead class="bg-light ">
                                <th>account_number</th>
                                <th>essn_number</th>
                                <th>mac</th>
                                <th>first_name</th>
                                <th>last_name</th>
                                <th>email</th>
                                <th>zip</th>
                                </thead>
                                <tbody>{this.state.customers.map(function(item, key) {
                                        
                                        return (
                                            <tr key = {key}>
                                                <td>{item.account_number}</td>
                                                <td>{item.esn_number}</td>
                                                <td>{item.mac_address}</td>
                                                <td>{item.first_name}</td>
                                                <td>{item.last_name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.zip_code}</td>
                                                <td>
                                                    <button onClick={handleClick} type="button" value={item.id} email={item.email}>show</button>
                                                    <a href="#"><i class="fa fa-trash"></i></a>
                                                </td>

                                            </tr>
                                            )
                                        
                                        })}
                                    </tbody>
                              </table>
		                </div>
		            </div>

                </div>
            </div>            
        </div>
    </div>

</div>

   )
  }
}

export default Search
