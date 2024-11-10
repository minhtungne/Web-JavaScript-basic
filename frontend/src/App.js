import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Home, UserList, UserForm, UserDetail } from './pages';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/users" element={<UserList/>} />
                    <Route path="/users/new" element={<UserForm/>} />
                    <Route path="/users/:id/edit" element={<UserForm/>} />
                    <Route path="/users/:id" element={<UserDetail/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
