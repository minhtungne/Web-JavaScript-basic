// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Chào Mừng Đến Với Ứng Dụng Quản Lý Người Dùng</h1>
            <p>
                <Link to="/users">Đi đến trang quản lý người dùng</Link>
            </p>
        </div>
    );
};

export default Home;