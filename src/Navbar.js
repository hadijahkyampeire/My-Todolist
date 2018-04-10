import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => (
    <nav
      className="navbar navbar-toggleable-md navbar-light"
      style={{
      backgroundColor: "#e98b119e",
      borderRadius: 0,
      marginBottom: 0,
      paddingBottom: 0,
      paddingTop: 0,
    }}>
      <a className="navbar-brand" href="!#">
      <img src="https://images.unsplash.com/photo-1506784242126-2a0b0b89c56a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5402354557b143f3d8909b37dc1e7469&auto=format&fit=crop&w=1948&q=80" width="30" height="30" class="d-inline-block align-top" alt=""/>
      Todolist by KH
    </a>
       <div className="bar">
            <ul
              className="navbar-nav ml-auto"
              style={{
              color: 'white'
            }}>
              <li className="nav-item">
                <NavLink to="/" exact className="nav-link">
                  <i className="fa fa-clipboard-list "/> {' '}Lists</NavLink>
  
              </li>
              <li className="nav-item">
                <NavLink
                  to="/donelists"
                  className="nav-link">
                  <span><i className="fa fa-copy"/> Done items</span></NavLink>
              </li>
            </ul>
            </div>
    </nav>
  );
export default Nav;