const db = require('../config/database');

// Tạo bảng nếu chưa tồn tại
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT
  )`);
});

// Hàm trợ giúp để chuyển đổi callback thành Promise
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID || this.changes);
    });
  });
};

const getQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

const allQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

const UserModel = {
  create: async (name, email, password) => {
    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }
    return await runQuery(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
  },

  getAll: async () => {
    return await allQuery(`SELECT id, name, email FROM users`);
  },

  getById: async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }
    return await getQuery(`SELECT id, name, email FROM users WHERE id = ?`, [id]);
  },

  update: async (id, name, email) => {
    if (!id || (!name && !email)) {
      throw new Error('ID is required and at least one of name or email must be provided');
    }
    return await runQuery(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, id]);
  },

  delete: async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }
    return await runQuery(`DELETE FROM users WHERE id = ?`, [id]);
  },

  getByEmail: async (email) => {
    if (!email) {
      throw new Error('Email is required');
    }
    return await getQuery(`SELECT * FROM users WHERE email = ?`, [email]);
  }
};

module.exports = UserModel;