import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="">Home</NavLink>
                <NavLink to="/users">UserList</NavLink>
                <NavLink to="/users/new">UserForm</NavLink>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;