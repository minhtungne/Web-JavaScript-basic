// src/components/UserDetail.js
import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/api';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [user, setUser ] = useState(null);

    useEffect(() => {
        const fetchUser   = async () => {
            const response = await getUserById(id);
            setUser  (response.data);
        };
        fetchUser  ();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>Thông Tin Người Dùng</h2>
            <p>Tên: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Thêm thông tin khác nếu cần */}
            <Link to={`/users/${user.id}/edit`}>Sửa Thông Tin Người Dùng</Link>
        </div>
    );
};

export default UserDetail;