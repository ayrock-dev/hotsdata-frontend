import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

const Header = (props) => {
  return (
    <Menu>
      <Menu.Item name='brand'>
        <Link to="/">Kerrigan</Link>
      </Menu.Item>
      <Menu.Item name='register'>
        <Link to="/upload">Upload</Link>
      </Menu.Item>
      <Menu.Item name='signin'>
        <Link to="/signin">Log In</Link>
      </Menu.Item>
      <Menu.Item name='register'>
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
