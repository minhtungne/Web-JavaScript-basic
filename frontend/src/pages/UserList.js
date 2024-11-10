import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser  } from '../services/api';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getAllUsers();
        setUsers(response.data);
    };

    const handleDelete = async (id) => {
        await deleteUser (id);
        fetchUsers(); // Cập nhật lại danh sách người dùng
    };

    return (
        <div>
            <h2>Danh Sách Người Dùng</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link> - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <Link to="/users/new">Thêm Người Dùng Mới</Link>
        </div>
    );
};

export default UserList;