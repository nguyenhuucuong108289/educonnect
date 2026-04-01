const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// --- 1. CẤU HÌNH ---
app.use(cors());
app.use(express.json());

// --- 2. DỮ LIỆU GIA SƯ (Lưu tạm trong RAM) ---
let tutors = [
    { id: 1, name: "Nguyễn Văn A", school: "ĐH Bách Khoa", subject: "Toán", price: "200k/buổi", degree: "Sinh viên năm 3" },
    { id: 2, name: "Trần Thị B", school: "ĐH Ngoại Thương", subject: "Tiếng Anh", price: "250k/buổi", degree: "Đã tốt nghiệp" }
];

// --- 3. CÁC ĐƯỜNG DẪN (ROUTES) ---

// Trả về giao diện web
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Lấy danh sách gia sư
app.get('/api/tutors', (req, res) => {
    res.json(tutors);
});

// Xử lý đăng ký mới (Có thêm CCCD và Bằng cấp)
app.post('/api/tutors', (req, res) => {
    const { name, school, subject, price, cccd, degree } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !cccd || !degree) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ Họ tên, CCCD và Bằng cấp!" });
    }

    const newTutor = {
        id: tutors.length + 1,
        name,
        school,
        subject,
        price,
        cccd,    // Lưu số CCCD (Ẩn, không hiện ra ngoài web)
        degree,  // Lưu bằng cấp
        date: new Date().toLocaleString()
    };

    tutors.push(newTutor);
    console.log("Mới đăng ký:", newTutor); // Xem trong terminal để biết CCCD
    res.status(201).json({ message: "Đăng ký thành công!", data: newTutor });
});

// --- 4. CHẠY SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 EduConnect chạy tại: http://localhost:${PORT}`);
});