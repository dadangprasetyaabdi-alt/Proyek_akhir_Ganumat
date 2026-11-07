# GANUMAT

Aplikasi pembelajaran matematika berbasis React dan Vite.

## Menjalankan secara lokal

Pastikan Node.js versi LTS sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

## Build produksi

```bash
npm run build
npm run preview
```

## Deploy ke Vercel

1. Upload seluruh isi folder GANUMAT ini ke root repository GitHub (bukan folder pembungkus ZIP).
2. Pastikan `index.html`, `main.jsx`, `App.jsx`, `package.json`, `index.css`, folder `assets/`, dan `vercel.json` terlihat pada tingkat utama repository.
3. Di Vercel, buka **Project Settings → Build and Deployment**.
4. Pilih Framework Preset **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Jika repository berisi proyek ini di dalam subfolder, atur **Root Directory** ke nama subfolder tersebut. Jika isi proyek ada langsung di root repository, gunakan `.` / kosongkan Root Directory.
8. Redeploy setelah perubahan tersimpan.

## Struktur folder

```text
GANUMAT/
├── App.jsx
├── main.jsx
├── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
├── assets/
│   ├── menyapa.png
│   ├── Menunjuk.png
│   ├── mendapatkan ide.png
│   ├── apresiasi.png
│   └── selamat.png
└── ...konfigurasi lainnya
```
