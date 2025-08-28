# Lý do làm
Tôi lười xếp tkb tay, dưới đây là phần docs do AI viết, các bạn đọc hay không cũng được.
Do trường không gửi file excel, chỉ gửi file pdf (tôi lười cào dữ liệu từ file này), nên data sẽ chỉ được update khi nào trường gửi tkb bản cuối cùng trên google sheet (mặc dù không download hay copy được nhưng cào dữ liệu nó dễ hơn).
Mọi thắc mắc liên hệ pgonfhaha@gmail.com
Chúc may mắn.

# 📚 UET Schedule Manager - Quản Lý Thời Khóa Biểu UET.

## ✨ Tính năng chính

- 🎯 **Quản lý môn học**: Tìm kiếm, lọc và chọn môn học từ 1300+ môn học
- 📅 **Thời khóa biểu trực quan**: Hiển thị lịch học theo tuần với 15 tiết/ngày
- 🔄 **Chọn nhóm thông minh**: Tự động xử lý lớp lý thuyết (CL) và thực hành (N1/N2)
- 📊 **Xuất Excel**: Xuất thời khóa biểu ra file Excel với 2 sheet chi tiết
- 💾 **Lưu/Tải**: Lưu và tải lại thời khóa biểu đã tạo
- ⚠️ **Phát hiện xung đột**: Cảnh báo khi có xung đột lịch học
- 📱 **Responsive**: Tương thích với mọi thiết bị

## 🚀 Hướng dẫn sử dụng

### Cách 1: Chạy trực tiếp
1. Tải xuống source code
2. Mở file `index.html` bằng trình duyệt web
3. Bắt đầu sử dụng ngay!

### Cách 2: Chạy với HTTP Server
```bash
# Sử dụng Python
python -m http.server 8000

# Truy cập: http://localhost:8000
```

## 🎮 Cách sử dụng

1. **Tìm kiếm môn học**: Gõ tên môn hoặc mã môn vào ô tìm kiếm
2. **Lọc theo loại**: Chọn "Chuyên ngành", "Đại cương", hoặc "Tự chọn"
3. **Thêm môn học**: Click vào môn học để xem chi tiết và thêm vào TKB
4. **Chọn nhóm**: Với môn có thực hành, chọn nhóm N1 hoặc N2
5. **Xuất Excel**: Click "📊 Xuất Excel" để tải file thời khóa biểu
6. **Lưu TKB**: Click "💾 Lưu TKB" để lưu lại cấu hình

## 🏗️ Cấu trúc dự án

```
TKB/
├── index.html          # Giao diện chính
├── style.css           # Stylesheet responsive
├── script.js           # Logic ứng dụng
├── data.js             # Dữ liệu 1300+ môn học UET HKI 2025-2026
└── README.md           # Tài liệu hướng dẫn
```

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Excel Export**: XLSX.js library
- **Data**: JSON embedded (1,326 môn học)
- **Storage**: LocalStorage cho lưu trữ cục bộ

## 📊 Dữ liệu

Ứng dụng chứa dữ liệu đầy đủ của **1,326 môn học** thuộc HKI 2025-2026 bao gồm:
- Mã học phần, tên môn học, số tín chỉ
- Lớp học phần (LHP), nhóm (CL/N1/N2)
- Thời gian (thứ, tiết), phòng học
- Giảng viên, số sinh viên dự kiến

## 🎯 Tính năng đặc biệt

### Chọn nhóm thông minh
- **Lớp CL (Chung)**: Tự động thêm tất cả tiết lý thuyết
- **Nhóm N1/N2**: Hiển thị modal chọn nhóm thực hành
- **Tự động kết hợp**: CL + N1 hoặc CL + N2

### Xuất Excel chi tiết
- **Sheet 1**: Bảng thời khóa biểu 15x7 (tiết x ngày)
- **Sheet 2**: Danh sách chi tiết môn học đã chọn
- **Format đẹp**: Tự động điều chỉnh độ rộng cột

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy:
1. Fork repository này
2. Tạo branch mới: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📝 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 🏫 Dành cho sinh viên UET

⭐ **Nếu ứng dụng hữu ích, hãy star cho repository này!** ⭐



## 🔧 Troubleshooting

### Lỗi Python Script

#### "ModuleNotFoundError"
```bash
pip install -r requirements.txt
```

## 🎯 Workflow khuyến nghị

### Lần đầu sử dụng
1. **Cài đặt Python + thư viện**
2. **Chạy script Python** để trích xuất CSV từ PDF
3. **Mở web app** và tải CSV
4. **Tạo thời khóa biểu** của bạn

### Sử dụng hàng ngày
1. **Mở web app** (`index.html`)
2. **Chọn môn học** và sắp xếp lịch
3. **Lưu thời khóa biểu** khi hoàn thành


## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Đọc lại hướng dẫn này
2. Kiểm tra phần Troubleshooting
3. Xem console log trong browser (F12)
4. Tạo issue mới với thông tin chi tiết

---

**Happy Scheduling! 🎓📅**
