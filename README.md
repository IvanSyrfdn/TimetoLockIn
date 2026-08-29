<div align="center">

# Time to Lock In

** Task Tracker with Integrated Pomodoro Timer & Completion History**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📖 Tentang Proyek

**Time to Lock in ** adalah aplikasi web produktivitas modern yang menggabungkan manajemen tugas (*task tracker*) dengan teknik **Pomodoro** dan jam *real-time*. Dirancang dengan nuansa desain **Spring Vintage** yang hangat dan estetis namun tetap mempertahankan fungsionalitas komponen modern ala Shadcn UI.

Seluruh data tugas terhubung langsung secara persisten ke database **MongoDB** dengan dukungan penuh operasi **CRUD** (*Create, Read, Update, Delete*).

---

## ✨ Fitur Utama

- 🕒 **Dynamic Real-Time Clock**: Menampilkan jam digital *real-time* (WIB) dan tanggal otomatis yang selalu sinkron setiap detik.
- ⏱️ **Integrated Pomodoro Timer**: Mendukung mode *Focus* (25m), *Short Break* (5m), dan *Long Break* (15m) yang langsung tertaut dengan task aktif.
- 📋 **Comprehensive Task Management (CRUD)**:
  - Tambah tugas baru dengan detail deskripsi, tingkat prioritas (*Low, Medium, High*), dan target sesi Pomodoro.
  - Lampiran foto tugas (mendukung URL gambar eksternal maupun upload file lokal).
  - Edit dan hapus tugas secara instan.
- 📅 **Completion Timestamp History**: Mencatat tanggal dan jam eksak saat tugas diselesaikan (*Completed*) serta log riwayat pengerjaan.
- 🎨 **Spring Vintage Aesthetic**:
  - Palet warna hangat: `#5F6F52` (Deep Sage), `#A9B388` (Soft Olive), `#FEFAE0` (Warm Cream), `#B99470` (Warm Ochre).
  - Kombinasi tipografi **Montserrat** untuk heading dan **Inter** untuk body text.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (ditenagai oleh Vite)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Typography:** Google Fonts (Montserrat & Inter)

### Backend & Database
- **Runtime:** Node.js
- **Framework:** Express.js
- **ODM:** Mongoose
- **Database:** MongoDB (Lokal / Atlas)

---

## 📁 Struktur Direktori

```text
TimetoLockin/
├── server/                 # Backend Express & MongoDB
│   ├── models/
│   │   └── Task.js         # Mongoose Task Schema
│   ├── .env                # Environment Variables (ignored by git)
│   ├── package.json
│   └── server.js           # API Endpoints & DB Connection
├── src/                    # Frontend React
│   ├── components/
│   │   ├── HeaderClock.jsx   # Jam Real-Time
│   │   ├── PomodoroTimer.jsx # Pomodoro Logic & UI
│   │   ├── TaskCard.jsx      # Kartu Item Task
│   │   └── TaskModal.jsx     # Modal Form Create/Edit Task
│   ├── App.jsx             # State Management & API Integration
│   ├── index.css           # Konfigurasi Tailwind & Fonts
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
<<<<<<< HEAD

```

Panduan Instalasi & Setup
=======
```
---

>>>>>>> a245fd766174a160fe55baa342e03686680865ed
## Instalasi Dependensi
A. Frontend Dependencies (Root Folder)
- npm install
B. Backend Dependencies (Folder Server)
Masuk ke folder server lalu pasang dependensi backend:
- npm install
C. Konfigurasi Environment Variable (.env)
Di dalam folder server/, buat file baru bernama .env:

Cuplikan kode
<<<<<<< HEAD
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/focusflow_db
=======
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/TimetoLockin
```
>>>>>>> a245fd766174a160fe55baa342e03686680865ed
Catatan: Ganti nilai MONGO_URI dengan connection string MongoDB Atlas kamu jika menggunakan database cloud.

D. Menjalankan Database MongoDB (Lokal)
Pastikan MongoDB service sudah aktif di latar belakang:

🚀 Menjalankan Aplikasi
Kamu bisa menjalankan backend dan frontend melalui dua terminal terpisah:

Terminal 1 — Menjalankan Backend Server
```Bash
cd server
npm run dev
<<<<<<< HEAD

=======
```
>>>>>>> a245fd766174a160fe55baa342e03686680865ed
Backend akan berjalan di: http://localhost:5000

Terminal 2 — Menjalankan Frontend React
Buka terminal/tab baru di root direktori proyek (TimetoLockin):
```Bash
npm run dev
<<<<<<< HEAD
Frontend akan berjalan di: http://localhost:5173


Buka browser kamu dan akses http://localhost:5173 untuk mulai menggunakan aplikasi!
=======
```
Frontend akan berjalan di: http://localhost:5173

Buka browser http://localhost:5173 untuk mulai menggunakan aplikasi!
>>>>>>> a245fd766174a160fe55baa342e03686680865ed
