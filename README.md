# GANUMAT

Aplikasi web GANUMAT berbasis React dan Vite.

## Struktur proyek

```text
GANUMAT/
├── App.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── assets/          # Gambar maskot (PNG)
└── src/
    ├── main.jsx
    └── index.css
```

## Menjalankan di komputer lokal

1. Ekstrak ZIP, lalu buka folder `GANUMAT` (folder yang berisi `package.json`) di Visual Studio Code.
2. Pastikan Node.js dan npm sudah terpasang.
3. Buka terminal pada folder proyek dan jalankan:

   ```bash
   npm install
   npm run dev
   ```

4. Buka alamat lokal yang ditampilkan Vite di terminal (biasanya `http://localhost:5173`).

## Build untuk produksi

```bash
npm run build
```

Hasil build akan berada di folder `dist/`.

> Folder `node_modules/` dan `.git/` tidak disertakan. `node_modules` akan dibuat kembali oleh `npm install`; riwayat Git dikelola oleh repository GitHub.
