import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <h1> </h1>
        <Link to="/users">User List</Link>
      </nav>
    </header>
  );
};

export default Header; 
