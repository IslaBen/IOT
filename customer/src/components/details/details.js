import React, { Component } from "react";
// import jwt_decode from 'jwt-decode'
import axios from "axios";
import $ from "jquery";
import DataResponse from "../../api.js";
import Moment from "react-moment";
import Notifications, { notify } from "react-notify-toast";
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
import "./Detail.css"

class Details extends Component {
  constructor() {
    super();
    this.state = {
      customer: {},
      notes: [],
      content: "",
      account_number: 0,
      esn_number: 0,
      mac_address: "",
      first_name: "",
      last_name: "",
      email: "",
      zip_code: "",
      SensorData: [],
      CSQReadings: [],
      Hub: [],
      RebootTimes: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitCustomer = this.onSubmitCustomer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }
  handleClick = e => {
    $("." + e.target.id).toggle();
  };
  componentDidMount() {
    $.LoadingOverlay("show", {
      imageColor: "#007bff",
      size: "30"
    });
    const url_customer =
      "http://localhost:8080/customer?id=" + this.props.match.params.id;
    const url_notes =
      "http://localhost:8080/note?id_customer=" + this.props.match.params.id;
    //the link shoudl change ,
    const SensorData_url = "http://localhost:3001/SensorData";
    const Hub_url = "http://localhost:3001/Hub";
    const CSQReadings_url = "http://localhost:3001/CSQReadings";

    axios
      .all([
        axios.get(url_customer),
        axios.get(url_notes),
        axios.get(SensorData_url),
        axios.get(Hub_url),
        axios.get(CSQReadings_url)
      ])
      .then(
        axios.spread((customer, notes, SensorData, Hub, CSQReadings) => {
          this.setState({
            customer: customer.data.data.recordsets[0][0],
            notes: notes.data.data.recordsets[0].reverse(),
            account_number: customer.data.data.recordsets[0][0].account_number,
            esn_number: customer.data.data.recordsets[0][0].esn_number,
            mac_address: customer.data.data.recordsets[0][0].mac_address,
            first_name: customer.data.data.recordsets[0][0].first_name,
            last_name: customer.data.data.recordsets[0][0].last_name,
            email: customer.data.data.recordsets[0][0].email,
            zip_code: customer.data.data.recordsets[0][0].zip_code,
            SensorData: SensorData.data,
            Hub: Hub.data,
            CSQReadings: CSQReadings.data
          });
          $.LoadingOverlay("hide", {
            imageColor: "#007bff",
            size: "30"
          });
        })
      );
  }



  onSubmitCustomer(e) {
    e.preventDefault();
    let myColor = { background: "#5de67d", text: "#FFFFFF" };
    const url = `http://localhost:8080/customer/update`;
    console.log(this.state.account_number);
    let c = {};
    c["account_number"] = this.state.account_number;
    c["esn_number"] = this.state.esn_number;
    c["mac_address"] = this.state.mac_address;
    c["first_name"] = this.state.first_name;
    c["last_name"] = this.state.last_name;
    c["email"] = this.state.email;
    c["zip_code"] = this.state.zip_code;

    return axios
      .post(url, c)
      .then(response =>
        this.setState({
          customer: response.data.data.recordsets[0][0],
          account_number: response.data.data.recordsets[0][0].account_number,
          esn_number: response.data.data.recordsets[0][0].esn_number,
          mac_address: response.data.data.recordsets[0][0].mac_address,
          first_name: response.data.data.recordsets[0][0].first_name,
          last_name: response.data.data.recordsets[0][0].last_name,
          email: response.data.data.recordsets[0][0].email,
          zip_code: response.data.data.recordsets[0][0].zip_code
        })
      )
      .then(response =>
        notify.show("updated succefuly  ! ", "custom", 5000, myColor)
      )
      .catch(err => console.error(err));
  }

  handleNote(e) {
    e.preventDefault();
    let myColor = { background: "#5de67d", text: "#FFFFFF" };

    if (this.state.content.length != 0) {
      const url = `http://localhost:8080/insert/note`;
      return axios
        .post(url, {
          id_customer: e.target.value,
          content: this.state.content
        })
        .then(response =>
          this.setState({ notes: response.data.data.recordsets[0].reverse() })
        )
        .then(response => notify.show("note saved ! ", "custom", 5000, myColor))
        .then(response => $("#textNote").text(""))
        .catch(err => console.error(err));
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const handleNote = this.handleNote;
    const handleClick = this.handleClick;
    return (
      <div class="emp-profile">
        <Notifications />
        <form method="post">
          <div class="row mt-5">
            <div class="col-md-3 p-5  mx-auto shadow rounded">
              <div class="list-group  border-0">
                <a className="list-group-item border-0 list-item">
                  Account Number : <span className=" value ">{this.state.customer.account_number}</span>
                </a>
                <a className="list-group-item border-0 list-item">
                  ESSN Number :{this.state.customer.esn_number}{" "}
                </a>
                <a className="list-group-item border-0 list-item">
                  MAC :{this.state.customer.mac_address}{" "}
                </a>
                <a className="list-group-item border-0 list-item">
                  First Name :{this.state.customer.first_name}{" "}
                </a>
                <a className="list-group-item border-0 list-item">
                  Last Name :{this.state.customer.last_name}{" "}
                </a>
                <a className="list-group-item border-0 list-item">
                  Email :{this.state.customer.email}{" "}
                </a>
                <a className="list-group-item border-0 list-item">
                  ZIP :{this.state.customer.zip_code}{" "}
                </a>
              </div>
            </div>

            <div class="col-md-8 mx-auto pb-5 shadow rounded">
              <div class="profile-head">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Sensors status
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="customer-tab"
                      data-toggle="tab"
                      href="#customer"
                      role="tab"
                      aria-controls="customer"
                      aria-selected="true"
                    >
                      customer informations
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#notes"
                      role="tab"
                      aria-controls="notes"
                      aria-selected="false"
                    >
                      notes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="hubs-tab"
                      data-toggle="tab"
                      href="#hubs"
                      role="tab"
                      aria-controls="hubs"
                      aria-selected="false"
                    >
                      Hubs
                    </a>
                  </li>
                </ul>
              </div>
              <div class="tab-content profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <table class="table value">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">status</th>
                        <th scope="col">last reported</th>
                        <th scope="col">battery</th>
                        <th scope="col">last reported</th>
                        <th scope="col">state</th>
                        <th scope="col">last reported</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.SensorData.map(function(item, key) {
                        return (
                          <React.Fragment>
                            <tr>
                              <th
                                scope="row"
                                id={"table-row" + key}
                                onClick={handleClick}
                              >
                                +
                              </th>
                              <td>{item.SensorID}</td>
                              <td className={`${item.LastStatus}`}>
                                {item.LastStatus === "ONLINE" ? (
                                    <i className="fas fa-check-circle text-success mx-3"></i>
                                ) : (
                                    <i className="fas fa-times-circle text-danger mx-3"></i>
                                )}
                              </td>
                              <td>
                                <Moment date={item.lastActivateTime} />
                              </td>
                              <td>
                                {item.BatteryPct == null ? (
                                  <span>0</span>
                                ) : (
                                  <span>{item.BatteryPct}</span>
                                )}
                                %
                              </td>
                              <td>8/22/2019 5:30 PM</td>
                              <td>open</td>
                              <td>8/22/2019 5:30 PM</td>
                            </tr>
                            {item.Events.map(event => (
                              <tr
                                className={"table-row" + key}
                                style={{ display: "none" }}
                              >
                                <td colspan="2"></td>
                                <td>
                                  {event.State == 0 ? (
                                    <p>offline</p>
                                  ) : (
                                    <p>online</p>
                                  )}
                                </td>
                                <td>
                                  <Moment date={event.Date} />
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="hubs"
                  role="tabpanel"
                  aria-labelledby="hubs-tab"
                >
                  <table class="table value">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">status</th>
                        <th scope="col">last reported</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{"Mac Address"}</th>
                        <td>{this.state.Hub.MacAddress}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>

                      <tr>
                        <th scope="row">IP Addresses</th>
                        <td>{this.state.Hub.IPAddresses}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th>Scripts Version</th>
                        <td>{this.state.Hub.Scripts_Version}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th scope="row">CSQ</th>
                        <td>{this.state.Hub.CSQ}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th scope="row">Last Active Time</th>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastActiveTime} /></td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th scope="row">Power Source</th>
                        <td>{this.state.Hub.Power_Source}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th scope="row">Battery Level</th>
                        <td>{this.state.Hub.BatteryPct}</td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                      <tr>
                        <th scope="row">Last Reboot Time</th>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastRebootTime} /></td>
                        <td><Moment format="YYYY-MM-DD HH:mm" date={this.state.Hub.LastPayLoad} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="customer"
                  role="tabpanel"
                  aria-labelledby="customer-tab"
                  style={{ padding: "14px" }}
                >
                  <div class="row mt-3">
                    <div class="offset-md-3 col-md-6">
                      <form noValidate onSubmit={this.onSubmitCustomer}>
                        <h1 className="h3 mb-3 font-weight-normal text-center ">
                          Update Customer
                        </h1>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="account_number"
                            readOnly="true"
                            placeholder="Enter your account number"
                            value={this.state.account_number}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="esn_number"
                            placeholder="Enter essn number"
                            value={this.state.esn_number}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="mac_address"
                            placeholder="Enter mac adress : "
                            value={this.state.mac_address}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="first_name"
                            placeholder="Enter your first name"
                            value={this.state.first_name}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="last_name"
                            placeholder="Enter your last name"
                            value={this.state.last_name}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control input-styling text-center"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control input-styling text-center"
                            name="zip"
                            placeholder="zip code"
                            value={this.state.zip_code}
                            onChange={this.onChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-lg btn-block btn-signin btn-animate col-md-6 col-sm-8  offset-md-3"
                        >
                          update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="notes"
                  role="tabpanel"
                  aria-labelledby="notes-tab"
                  style={{ padding: "14px" }}
                >
                  <div class="row mt-3">
                    <div class="col-md-10 mx-auto">
                      <div class="form-group purple-border">
                        <form noValidate>
                          <label for="exampleFormControlTextarea4">
                            New Note :
                          </label>
                          <textarea
                            className="form-control textarea-styl "
                            id="textNote"
                            rows="2"
                            onChange={this.onChange}
                            name="content"
                          ></textarea>

                          <button
                            type="submit"
                            className="btn btn-lg btn-block btn-signin btn-animate col-md-3 col-sm-8 col-sm-2 offset-md-9"
                            onClick={handleNote}
                            value={this.props.match.params.id}
                          >
                            save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div class="col-md-12">
                      <div class="form-group purple-border">
                        <label for="">Your Notes :</label>
                        <table class="table value">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Content</th>
                              <th scope="col">created at</th>                              
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.notes.map(function(item, key) {
                              return (
                                <tr key={key}>
                                  <td>{key}</td>
                                  <td>{item.content}</td>
                                  <td><Moment format="YYYY-MM-DD HH:mm" date={item.created_at} /></td>
                                </tr>
                              );
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
        </form>
      </div>
    );
  }
}

export default Details;
