import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Nav = styled.nav`
    background: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

export const NavLink = styled(Link)`
    color: #fff;
    padding: 0 15px;
    text-decoration: none;
    &:hover {
        color: #f0a500;
    }
`;