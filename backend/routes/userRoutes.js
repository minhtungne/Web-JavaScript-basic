const express = require('express');
const userController = require('../controllers/userController');
// const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// router.post('/signup', userController.signup);
// router.post('/login', userController.login);

// Đăng ký người dùng mới
router.post('/users', userController.signup);

// Lấy danh sách người dùng
router.get('/users', userController.getAllUsers);

// Lấy thông tin người dùng theo ID
router.get('/users/:id', userController.getUserById);

// Cập nhật thông tin người dùng
router.put('/users/:id', userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', userController.deleteUser);

// Lấy thông tin người dùng theo email
router.get('/users/email/:email', userController.getUserByEmail);

module.exports = router;
