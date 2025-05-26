# TaskEasy – Aplikasi Manajemen Tugas

TaskEasy adalah aplikasi manajemen tugas sederhana yang dibangun menggunakan praktik **Extreme Programming (XP)**. Aplikasi ini memungkinkan pengguna untuk membuat, melihat, memperbarui, dan menghapus tugas serta melacak status dan prioritasnya.

## 🔧 Fitur Utama (Planned)

- ✅ **Day 1**: Project setup dan perencanaan
- ✅ **Day 2**: Membuat tugas dengan judul, deskripsi, prioritas (US1)
- 🔄 **Day 3**: Melihat daftar tugas yang diurutkan berdasarkan prioritas (US2)
- 🔄 **Day 4**: Memperbarui status dan detail tugas (US3)
- 🔄 **Day 5**: Menghapus tugas (US4)
- 🔄 **Day 6**: Persiapan deploy dan dokumentasi
- 🔄 **Day 7**: Presentasi

## 🛠️ Teknologi yang Digunakan

- HTML, CSS, dan JavaScript murni (Frontend)
- LocalStorage (untuk penyimpanan data di sisi klien)
- Jest (untuk testing)
- GitHub Actions (untuk CI/CD)

## 👥 Peran dalam Pair Programming

| Hari   | Driver | Navigator | Reviewer |
| ------ | ------ | --------- | -------- |
| Hari 1 | Setup  | Planning  | Review   |
| Hari 2 | Zein   | Rian      | Robi     |
| Hari 3 | Robi   | Zein      | Rian     |
| Hari 4 | Rian   | Robi      | Zein     |
| Hari 5 | Zein   | Rian      | Robi     |
| Hari 6 | Robi   | Zein      | Rian     |
| Hari 7 | Rian   | Robi      | Zein     |

## 🚀 Memulai Proyek

\`\`\`bash

# Install dependencies

npm install

# Run development server

npm run dev

# Run tests

npm test

# Run tests in watch mode

npm run test:watch
\`\`\`

## 📋 User Stories

| ID  | User Story                                                                            | Prioritas | Poin Cerita | Status |
| --- | ------------------------------------------------------------------------------------- | --------- | ----------- | ------ |
| US1 | Sebagai pengguna, saya dapat membuat tugas dengan judul, deskripsi, prioritas         | Tinggi    | 3           | ✅     |
| US2 | Sebagai pengguna, saya dapat melihat semua tugas yang diurutkan berdasarkan prioritas | Tinggi    | 2           | 🔄     |
| US3 | Sebagai pengguna, saya dapat memperbarui status dan detail tugas                      | Sedang    | 2           | 🔄     |
| US4 | Sebagai pengguna, saya dapat menghapus tugas                                          | Rendah    | 1           | 🔄     |

## 📆 Rencana Sprint

| Hari | Target Kegiatan                                           | Status |
| ---- | --------------------------------------------------------- | ------ |
| 1    | Menyiapkan proyek, repositori, dan perencanaan user story | ✅     |
| 2    | Mengerjakan US1 dengan pendekatan TDD                     | ✅     |
| 3    | Mengerjakan US2 dan melakukan refactoring                 | 🔄     |
| 4    | Mengerjakan US3                                           | 🔄     |
| 5    | Mengerjakan US4                                           | 🔄     |
| 6    | Persiapan deploy dan dokumentasi                          | 🔄     |
| 7    | Presentasi                                                | 🔄     |

---

## 🧠 Planning Game – TaskEasy

### 🎯 Tujuan

Menguraikan proyek menjadi user story yang dapat dikelola dan merencanakan pengembangan.

## ☀️ Catatan Stand-Up Harian – TaskEasy

### Hari 1 ✅

- **Kemajuan:** Repositori diinisialisasi, user story direncanakan
- **Selanjutnya:** Mulai US1 dengan TDD

### Hari 2 ✅

- **Peran Pair Programming:** Zein (Driver), Rian (Navigator), Robi (Reviewer)
- **Target:** Pembuatan fitur tambah tugas dengan pendekatan TDD
- **Hasil:** US1 berhasil diimplementasi dengan validasi lengkap
- **Selanjutnya:** Menampilkan daftar tugas berdasarkan prioritas

### Hari 3 🔄

- **Peran Pair Programming:** Robi (Driver), Zein (Navigator), Rian (Reviewer)
- **Target:** US2 - Fitur sorting berdasarkan prioritas + refactoring
- **Selanjutnya:** Implementasi fitur update dan delete

### Hari 4 🔄

- **Peran Pair Programming:** Rian (Driver), Robi (Navigator), Zein (Reviewer)
- **Target:** US3 - Implementasi fitur update tugas
- **Selanjutnya:** Implementasi fitur delete tugas

### Hari 5 🔄

- **Peran Pair Programming:** Zein (Driver), Rian (Navigator), Robi (Reviewer)
- **Target:** US4 - Implementasi fitur delete tugas
- **Selanjutnya:** Persiapan deploy dan dokumentasi

### Hari 6 🔄

- **Peran Pair Programming:** Robi (Driver), Zein (Navigator), Rian (Reviewer)
- **Target:** Persiapan deploy, dokumentasi lengkap, dan testing final
- **Selanjutnya:** Persiapan presentasi

### Hari 7 🔄

- **Peran Pair Programming:** Rian (Driver), Robi (Navigator), Zein (Reviewer)
- **Target:** Presentasi proyek dan demo aplikasi
- **Selanjutnya:** Evaluasi dan lessons learned

---

## 📋 Laporan Proyek XP – TaskEasy (Preview)

### 🔧 Praktik XP yang Akan Diterapkan

- **Pair Programming:** Rotasi harian peran driver/navigator/reviewer
- **TDD:** Pengujian ditulis terlebih dahulu sebelum implementasi
- **CI:** GitHub Actions menjalankan pengujian otomatis pada setiap push/PR
- **Rilis Kecil:** Fitur diselesaikan bertahap setiap hari
- **Refactoring:** Perbaikan kode setelah pengujian
- **Kolaborasi Pelanggan:** Satu anggota bertindak sebagai product owner

### 🎯 Kriteria Evaluasi

- **Functionality (30%)**: Apakah aplikasi memenuhi requirements?
- **XP Practices (40%)**: Seberapa efektif praktik XP diimplementasikan?
- **Collaboration (20%)**: Komunikasi dan kolaborasi tim
- **Presentation (10%)**: Kualitas demo dan penjelasan

---

_Dibuat dengan ❤️ menggunakan Extreme Programming practices_

**Next:** Ready untuk Day 3 - Mengerjakan US2 dan melakukan refactoring! 🚀
