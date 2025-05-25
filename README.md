# TaskEasy – Aplikasi Manajemen Tugas

TaskEasy adalah aplikasi manajemen tugas sederhana yang dibangun menggunakan praktik **Extreme Programming (XP)**. Aplikasi ini memungkinkan pengguna untuk membuat, melihat, memperbarui, dan menghapus tugas serta melacak status dan prioritasnya.

## 🔧 Fitur Utama (Planned)

* ✅ **Day 1**: Setup Project, pembuatan user story dan perencanaan
* 🔄 **Day 2**: Membuat tugas dengan judul, deskripsi, prioritas (US1)
* 🔄 **Day 3**: Melihat daftar tugas yang diurutkan berdasarkan prioritas (US2)
* 🔄 **Day 4**: Memperbarui dan menghapus tugas (US3 & US4)
* 🔄 **Day 5**: Dokumentasi dan persiapan presentasi

## 🛠️ Teknologi yang Digunakan

* HTML, CSS, dan JavaScript murni (Frontend)
* LocalStorage (untuk penyimpanan data di sisi klien)
* Jest (untuk testing)
* GitHub Actions (untuk CI/CD)

## 👥 Peran dalam Pair Programming

| Hari   | Driver | Navigator | Reviewer |
| ------ | ------ | --------- | -------- |
| Hari 1 | Setup  | Planning  | Review   |
| Hari 2 | Zein   | Rian      | Robi     |
| Hari 3 | Robi   | Zein      | Rian     |
| Hari 4 | Rian   | Robi      | Zein     |
| Hari 5 | Zein   | Rian      | Robi     |

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
| US1 | Sebagai pengguna, saya dapat membuat tugas dengan judul, deskripsi, prioritas         | Tinggi    | 3           | 🔄     |
| US2 | Sebagai pengguna, saya dapat melihat semua tugas yang diurutkan berdasarkan prioritas | Tinggi    | 2           | 🔄     |
| US3 | Sebagai pengguna, saya dapat memperbarui status dan detail tugas                      | Sedang    | 2           | 🔄     |
| US4 | Sebagai pengguna, saya dapat menghapus tugas                                          | Rendah    | 1           | 🔄     |

## 📆 Rencana Sprint

| Hari | Target Kegiatan                                           | Status |
| ---- | --------------------------------------------------------- | ------ |
| 1    | Menyiapkan proyek, repositori, dan perencanaan user story | ✅     |
| 2    | Mengerjakan US1 dengan pendekatan TDD                     | 🔄     |
| 3    | Mengerjakan US2 dan melakukan refactoring                 | 🔄     |
| 4    | Mengerjakan US3 & US4, pengujian, dan deploy              | 🔄     |
| 5    | Penyelesaian dokumentasi dan finalisasi presentasi        | 🔄     |

---

## 🧠 Planning Game – TaskEasy

### 🎯 Tujuan
Menguraikan proyek menjadi user story yang dapat dikelola dan merencanakan pengembangan.

## ☀️ Catatan Stand-Up Harian – TaskEasy

### Hari 1 ✅
* **Kemajuan:** Repositori diinisialisasi, user story direncanakan
* **Selanjutnya:** Mulai US1 dengan TDD

### Hari 2 🔄
* **Peran Pair Programming:** Zein (Driver), Rian (Navigator), Robi (Reviewer)
* **Target:** Pembuatan fitur tambah tugas dengan pendekatan TDD
* **Selanjutnya:** Menampilkan daftar tugas berdasarkan prioritas

### Hari 3 🔄
* **Peran Pair Programming:** Robi (Driver), Zein (Navigator), Rian (Reviewer)
* **Target:** Fitur daftar tugas dan sorting berdasarkan prioritas
* **Selanjutnya:** Implementasi fitur update dan delete

### Hari 4 🔄
* **Peran Pair Programming:** Rian (Driver), Robi (Navigator), Zein (Reviewer)
* **Target:** Implementasi update dan delete, refactoring
* **Selanjutnya:** Persiapan deploy dan dokumentasi

### Hari 5 🔄
* **Peran Pair Programming:** Zein (Driver), Rian (Navigator), Robi (Reviewer)
* **Target:** Penyelesaian dokumentasi dan finalisasi presentasi
* **Selanjutnya:** Presentasi proyek

---

## 📋 Laporan Proyek XP – TaskEasy (Preview)

### 🔧 Praktik XP yang Akan Diterapkan

* **Pair Programming:** Rotasi harian peran driver/navigator/reviewer
* **TDD:** Pengujian ditulis terlebih dahulu sebelum implementasi
* **CI:** GitHub Actions menjalankan pengujian otomatis pada setiap push/PR
* **Rilis Kecil:** Fitur diselesaikan bertahap setiap hari
* **Refactoring:** Perbaikan kode setelah pengujian
* **Kolaborasi Pelanggan:** Satu anggota bertindak sebagai product owner

### 🎯 Kriteria Evaluasi

* **Functionality (30%)**: Apakah aplikasi memenuhi requirements?
* **XP Practices (40%)**: Seberapa efektif praktik XP diimplementasikan?
* **Collaboration (20%)**: Komunikasi dan kolaborasi tim
* **Presentation (10%)**: Kualitas demo dan penjelasan

---

*Dibuat dengan ❤️ menggunakan Extreme Programming practices*

**Next:** Ready untuk Day 2 - US1 Implementation dengan TDD approach! 🚀
