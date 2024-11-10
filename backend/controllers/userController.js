const UserModel = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;

// // Đăng ký người dùng mới
// exports.signup = (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   UserModel.create(name, email, hashedPassword, (err, userId) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: "Đăng ký thành công", userId });
//   });
// };

// // Đăng nhập
// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   UserModel.getByEmail(email, (err, user) => {
//     if (err || !user) return res.status(401).json({ error: "Email hoặc mật khẩu không đúng" });
//     if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: "Email hoặc mật khẩu không đúng" });

//     const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ message: "Đăng nhập thành công", token });
//   });
// };

// Đăng ký người dùng mới
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = await UserModel.create(name, email, password);
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    res.status(500).json({ error: "Error creating user: " + error.message });
  }
};

// Lấy danh sách người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users: " + error.message });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.getById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user: " + error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const changes = await UserModel.update(id, name, email);
    if (changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user: " + error.message });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const changes = await UserModel.delete(id);
    if (changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user: " + error.message });
  }
};

// Lấy thông tin người dùng theo email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.getByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user: " + error.message });
  }
};