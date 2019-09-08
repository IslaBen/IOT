import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {useTheme} from "../ThemeContext";
import logo from '../../logo.svg';
function withMyHook(Component) {
    return function WrappedComponent(props) {
        const myHookValue = useTheme();
        return <Component {...props} myHookValue={myHookValue} />;
    }
}


class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
      const themeState = this.props.myHookValue;
    const loginRegLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link navItem_styling">
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link navItem_styling">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link navItem_styling">
            create customer
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
             
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Home
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg component shadow  ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
            <i className="fa fa-bars"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link navItem_styling p-0">
                  <img src={logo} className="logo" alt=""/>
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
          <div>
              <a onClick={() => themeState.toggle()}>
                 <i className="fas fa-adjust darkMode "></i>
              </a>
          </div>

      </nav>
    )
  }
}
Landing = withMyHook(Landing);
export default withRouter(Landing)
