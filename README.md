# Portal GTK Gorontalo

Website statis untuk Portal Layanan & Informasi GTK Provinsi Gorontalo.

## Menjalankan lokal

Dari folder ini, jalankan salah satu server statis berikut:

```bash
php -S localhost:8080
```

Buka `http://localhost:8080` di browser. Alternatifnya, gunakan Live Server di VS Code.

## Isi

- `index.html` berisi struktur halaman dan styling Tailwind CSS melalui CDN.
- `app.js` berisi data dummy, filter kategori, pencarian real-time, modal detail, dan menu mobile.

Konten statistik, pengumuman, alamat, dan kontak di dalam halaman masih berupa data presentasi dan perlu diganti dengan data resmi sebelum digunakan secara produksi.
