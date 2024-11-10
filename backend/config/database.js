const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const XLSX = require('xlsx');

// Hàm đọc tệp Excel và trả về dữ liệu từ tất cả các sheet
function readExcelFile(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetsData = {};

    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        sheetsData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
    });

    return sheetsData;
}

// Hàm kết nối đến cơ sở dữ liệu SQLite
function connectToDatabase(dbPath) {
    return new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
}

// Hàm kiểm tra sự tồn tại của bảng
function tableExists(db, tableName) {
    return new Promise((resolve, reject) => {
        const query = `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`;
        db.get(query, [tableName], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row !== undefined);
            }
        });
    });
}

// Hàm xóa bảng nếu tồn tại
async function dropTableIfExists(db, tableName) {
    const exists = await tableExists(db, tableName);
    if (exists) {
        const dropTableQuery = `DROP TABLE ${tableName};`;
        db.run(dropTableQuery, (err) => {
            if (err) {
                console.error(`Error dropping table ${tableName}:`, err.message);
            } else {
                console.log(`Table ${tableName} dropped.`);
            }
        });
    }
}

// Hàm tạo bảng Nhan_vien
async function createNhanVienTable(db) {
    const createTableQuery = `
        CREATE TABLE Nhan_vien (
            Ma_so INTEGER PRIMARY KEY,
            Ten TEXT,
            Tuoi TEXT,
            Phong_Ban TEXT
        );`;
    return new Promise((resolve, reject) => {
        db.run(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating Nhan_vien table:', err.message);
                reject(err);
            } else {
                console.log('Table Nhan_vien created.');
                resolve();
            }
        });
    });
}

// Hàm tạo bảng Du_an
async function createDuAnTable(db) {
    const createTableQuery = `
        CREATE TABLE Du_an (
            Ma_Du_An TEXT PRIMARY KEY,
            Ten_Du_An TEXT,
            Ngay_Bat_Dau DATE,
            Ngay_Ket_Thuc DATE,
            Trang_Thai TEXT
        );`;
    return new Promise((resolve, reject) => {
        db.run(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating Du_an table:', err.message);
                reject(err);
            } else {
                console.log('Table Du_an created.');
                resolve();
            }
        });
    });
}

// Hàm chuyển đổi định dạng ngày tháng
function formatDate(date) {
    if (typeof date === 'number') {
        const excelEpoch = new Date(1899, 11, 30); // Ngày gốc của Excel
        const formattedDate = new Date(excelEpoch.getTime() + ((date + 1) * 24 * 60 * 60 * 1000));
        return formattedDate.toISOString().split('T')[0]; // Định dạng thành YYYY-MM-DD
    } else if (typeof date === 'string' || date instanceof Date) {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }
    return null; // Trả về null nếu không phải kiểu số, chuỗi hoặc Date
}

// Hàm kiểm tra sự tồn tại của bản ghi
function recordExists(db, tableName, uniqueValue) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) as count FROM ${tableName} WHERE "${tableName.split('_')[0]}" = ?`;
        db.get(query, [uniqueValue], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row.count > 0);
            }
        });
    });
}

// Hàm nhập dữ liệu vào bảng
async function insertData(db, tableName, data) {
    const keys = Object.keys(data[0]);
    const placeholders = keys.map(() => '?').join(', ');
    const insertQuery = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

    for (const row of data) {
        const uniqueValue = row[keys[0]];
        const exists = await recordExists(db, tableName, uniqueValue);
        
        if (!exists) {
            const values = keys.map(key => {
                if (key.trim() === 'Ngay_Bat_Dau' || key.trim() === 'Ngay_Ket_Thuc') {
                    const formattedDate = formatDate(row[key]);// In ra giá trị đã định dạng
                    return formattedDate; // Định dạng ngày tháng
                }
                return row[key]; // Giữ nguyên giá trị cho các cột khác
            });

            db.run(insertQuery, values, (err) => {
                if (err) {
                    console.error('Error inserting data:', err.message);
                }
            });
        } else {
            console.log(`Record with unique value = ${uniqueValue} already exists. Skipping.`);
        }
    }
}

// Hàm chính để nhập dữ liệu từ nhiều sheet
async function importDataFromExcelToSQLite(db, excelFilePath) {
    const sheetsData = readExcelFile(excelFilePath); // Đọc dữ liệu từ file Excel một lần

    // Xóa bảng Nhan_vien và Du_an nếu đã tồn tại
    await dropTableIfExists(db, 'Nhan_vien');
    await dropTableIfExists(db, 'Du_an');

    // Tạo bảng Nhan_vien và Du_an
    await createNhanVienTable(db);
    await createDuAnTable(db);

    // Nhập dữ liệu vào bảng Nhan_vien
    if (sheetsData['Nhan_vien']) {
        await insertData(db, 'Nhan_vien', sheetsData['Nhan_vien']);
    }

    // Nhập dữ liệu vào bảng Du_an
    if (sheetsData['Du_an']) {
        await insertData(db, 'Du_an', sheetsData['Du_an']);
    }
}

const dbPath = path.join(__dirname, 'database.db');
const excelFilePath = path.join(__dirname, 'test1.xlsx');
const db = connectToDatabase(dbPath); // Tạo kết nối bên ngoài

importDataFromExcelToSQLite(db, excelFilePath, 'UniqueColumnName') // Truyền kết nối và tên cột duy nhất vào hàm

process.on('SIGINT', () => {
  console.log('Closing database connection...');
  db.close((err) => {
      if (err) {
          console.error('Error closing database:', err.message);
      }
      process.exit(0); // Thoát ứng dụng
  });
});

module.exports = db;