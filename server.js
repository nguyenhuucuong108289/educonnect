const express = require('express');
const cors = require('cors');
const path = require('path'); // Khai báo 1 lần duy nhất ở đây thôi nhé

const app = express();

// --- 1. CẤU HÌNH ---
app.use(cors());
app.use(express.json());

// --- 2. DỮ LIỆU GIA SƯ (Lưu tạm) ---
let tutors = [
    { id: 1, name: "Nguyễn Văn A", school: "ĐH Bách Khoa", subject: "Toán", price: "200k/buổi" },
    { id: 2, name: "Trần Thị B", school: "ĐH Ngoại Thương", subject: "Tiếng Anh", price: "250k/buổi" },
    { id: 3, name: "Lê Văn C", school: "ĐH Sư Phạm", subject: "Văn", price: "180k/buổi" }
];

// --- 3. ĐỊNH TUYẾN (ROUTES) ---

// Trả về file giao diện index.html khi vào http://localhost:5000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lấy danh sách gia sư cho giao diện
app.get('/api/tutors', (req, res) => {
    res.json(tutors);
});

// Xử lý khi có sinh viên nhấn "Gửi hồ sơ"
app.post('/api/tutors', (req, res) => {
    const { name, school, subject, price } = req.body;
    const newTutor = {
        id: tutors.length + 1,
        name,
        school,
        subject,
        price,
        date: new Date().toLocaleString()
    };
    tutors.push(newTutor);
    res.status(201).json({ message: "Đăng ký thành công!", data: newTutor });
});

// --- 4. CHẠY SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 EduConnect đã sẵn sàng tại: http://localhost:${PORT}`);
});