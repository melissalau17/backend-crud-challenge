# Backend CRUD Challenge

Proyek backend ini dibangun menggunakan **NestJS** dengan pola **modular architecture**, agar setiap module memiliki tanggung jawab yang jelas dan mudah dikembangkan, diuji, serta di-scale di masa depan.

---

## Mengapa Menggunakan Arsitektur Modular?

- **Tanggung jawab terpisah**  
  Setiap module (`Auth`, `User`, `Recipe`, `Ingredients`) memiliki peran yang jelas.  
- **Reusability tinggi**  
  Service pada satu module dapat digunakan di module lain.  
- **Keamanan dengan JWT**  
  Endpoint tertentu dilindungi oleh autentikasi berbasis **JSON Web Token**.  
- **Mudah di-test**  
  Struktur modular mendukung testing **end-to-end (e2e)** dan unit testing secara efisien.

---

## ⚙️ Instalasi & Menjalankan Proyek

```bash
# Clone repository
git clone <repo-url>
cd backend-crud-challenge

# Install dependencies
npm install

# Jalankan dalam mode development
npm run start:dev

# Jalankan e2e testing
npm run test:e2e
