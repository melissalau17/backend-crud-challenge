# Backend CRUD Challenge

Proyek backend menggunakan **NestJS** dengan pola **modular architecture** untuk memisahkan tanggung jawab setiap module, memudahkan maintain, testing, dan scaling.

## Mengapa Menggunakan Pattern Modular?

- Module terpisah (Auth, User, Recipe, Ingredients) → jelas tanggung jawabnya  
- Service bisa digunakan ulang di module lain  
- Endpoint tertentu dilindungi JWT → aman  
- Mudah ditest secara e2e  

## Instalasi & Menjalankan

```bash
git clone <repo-url>
cd backend-crud-challenge
npm install
npm run start:dev   # untuk development
npm run test:e2e    # untuk e2e test

## Endpoint Utama

Auth

POST /auth/register → daftar user baru

POST /auth/login → login dan dapat JWT

User

GET /user → semua user

GET /user/:id → detail user

Recipe

POST /recipes → buat recipe

GET /recipes → list recipe

Ingredients

POST /recipes/:recipeId/ingredients → tambah ingredient

GET /recipes/:recipeId/ingredients → list ingredient

## Testing

Menggunakan Jest & Supertest

Pastikan user dibuat dulu sebelum login di test e2e