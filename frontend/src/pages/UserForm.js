// src/components/UserForm.js
import React, { useState, useEffect} from 'react';
import { signupUser , updateUser, getUserById  } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID từ URL

    useEffect(() => {
        if (id) {
            const fetchUser  = async () => {
                const response = await getUserById(id);
                setName(response.data.name);
                setEmail(response.data.email);
            };
            fetchUser ();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateUser (id, { name, email, password });
        } else {
            await signupUser ({ name, email, password });
        }
        navigate('/users'); // Quay lại danh sách người dùng
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Cập Nhật Người Dùng' : 'Đăng Ký Người Dùng'}</h2>
            <input
                type="text"
                placeholder="Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mật Khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!id} // Không yêu cầu mật khẩu khi cập nhật
            />
            <button type="submit">{id ? 'Cập Nhật' : 'Đăng Ký'}</button>
        </form>
    );
};

export default UserForm;