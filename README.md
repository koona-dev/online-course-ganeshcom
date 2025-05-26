### Konsep

• Fitur Minimum:

- Auth: 1. Register & Login(JWT based)

- Kursus:
1. List semua kursus
2. Detail kursus(by ID)
3. Tambah kursus(admin only)

- Pembelian:
1. Beli kursus
2. Lihat kursus yang sudah dibeli

### Requirement

- Teknologi Wajib:
1. Framework: NestJS
2. Database: PostgreSQL
3. ORM: Drizzle
4. JWT untuk otentikasi

- Opsional(Nilai Plus):
1. Penggunaan Docker
2. Dokumentasi API dengan Swagger
3. Implementasi arsitektur yang baik(DDD/Clean Architecture)

## DATA STRUCTURE DESIGN

### Entitas dan Hubungannya:

1. **Users**: Menyimpan data pengguna (baik instruktur maupun peserta).
2. **Courses**: Menyimpan informasi tentang kursus yang dibuat oleh instruktur.
3. **Lessons**: Menyimpan materi atau pelajaran dalam kursus.
4. **Categories**: Menyimpan kategori kursus (misalnya: Teknologi, Bisnis, Desain, dll).
5. **Enrollments**: Menyimpan data peserta yang terdaftar pada kursus tertentu.
6. **Payments**: Menyimpan data transaksi pembayaran untuk kursus.
7. **Reviews**: Menyimpan ulasan yang diberikan peserta untuk kursus yang mereka ikuti.

### Gambaran ERD

Berikut adalah struktur tabel dan relasinya:

### 1. **Users**

- `id` (PK)
- `username`
- `email`
- `password`
- `role` (instruktur/participant)
- `created_at`
- `updated_at`

### 2. **Courses**

- `id` (PK)
- `title`
- `description`
- `category_id` (FK ke Categories)
- `instructor_id` (FK ke Users)
- `price`
- `created_at`
- `updated_at`

### 3. **Lessons**

- `id` (PK)
- `course_id` (FK ke Courses)
- `title`
- `content`
- `video_url`
- `created_at`
- `updated_at`

### 4. **Categories**

- `id` (PK)
- `name`
- `created_at`
- `updated_at`

### 5. **Enrollments**

- `id` (PK)
- `user_id` (FK ke Users)
- `course_id` (FK ke Courses)
- `enrolled_at`
- `status` (e.g., completed, in-progress)

1. **Payments**
- `id` (PK)
- `user_id` (FK ke Users)
- `total_amount`
- `payment_method`
- `payment_status`
- `paid_at`

1. **Payment_Courses**
- `id` (PK)
- `payment_id` (FK ke Payments)
- `course_id` (FK ke Courses)
- `price_at_purchase` (opsional: menyimpan harga saat dibeli, jika harga kursus bisa berubah)
- `enrollment_id` (opsional: bisa digunakan jika ingin menghubungkan ke data pendaftaran langsung)

1. **Reviews**
- `id` (PK)
- `user_id` (FK ke Users)
- `course_id` (FK ke Courses)
- `rating` (1 to 5)
- `comment`
- `created_at`
- `updated_at`

### Relasi Antar Entitas:

1. **Users ↔ Courses**
    
    Seorang instruktur (`Users`) bisa membuat banyak `Courses`. Relasi ini bersifat one-to-many.
    
2. **Courses ↔ Categories**
    
    Setiap kursus hanya masuk dalam satu kategori (`Categories`), tapi satu kategori bisa memiliki banyak kursus. Relasi ini bersifat many-to-one.
    
3. **Users ↔ Enrollments ↔ Courses**
    
    Seorang peserta (`Users`) bisa mendaftar ke banyak kursus melalui tabel `Enrollments`. Relasi ini bersifat many-to-many antara `Users` dan `Courses`.
    
4. **Courses ↔ Lessons**
    
    Setiap kursus bisa memiliki banyak pelajaran (`Lessons`), relasi ini one-to-many.
    
5. **Users ↔ Payments**
    
    Setiap pembayaran dilakukan oleh seorang peserta (`Users`), yang terkait dengan kursus yang dibayar. Relasi ini one-to-many antara `Users` dan `Payments`.
    
6. **Courses ↔ Reviews**
    
    Setiap kursus bisa mendapatkan banyak ulasan (`Reviews`), dan setiap ulasan diberikan oleh peserta yang terdaftar. Relasi ini one-to-many.
    
    ![course-online (1).jpg](attachment:722c3f9a-60d2-440d-bdd2-bbc6abd5b0e2:course-online_(1).jpg)
    

### Gambaran Proses API

1. **User Registration**: Pengguna mendaftar, memilih menjadi instruktur atau peserta.
2. **Create Course**: Instruktur membuat kursus dan menambahkan pelajaran.
3. **Enroll Course**: Peserta mendaftar ke kursus.
4. **Make Payment**: Peserta melakukan pembayaran untuk kursus.
5. **View Courses**: Peserta melihat kursus dan kategori.
6. **Leave Review**: Peserta memberikan ulasan dan rating setelah mengikuti kursus.

---

## API STRUCTURE DESIGN

### **Swagger (OpenAPI 3.0) - Struktur Dasar + Auth & Courses**

```yaml
openapi: 3.0.0
info:
  title: Online Course API
  description: API untuk platform kursus online
  version: 1.0.0

servers:
  - url: http://localhost:3000/api
    description: Local server

tags:
  - name: Auth
  - name: Users
  - name: Courses

paths:
  /auth/register:
    post:
      tags:
        - Auth
      summary: Register user baru
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - username
                - email
                - password
              properties:
                username:
                  type: string
                email:
                  type: string
                password:
                  type: string
      responses:
        '201':
          description: Berhasil register
        '400':
          description: Data tidak valid

  /auth/login:
    post:
      tags:
        - Auth
      summary: Login pengguna
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Berhasil login
        '401':
          description: Kredensial salah

  /auth/me:
    get:
      tags:
        - Auth
      summary: Info user yang sedang login
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Informasi user
        '401':
          description: Tidak terautentikasi

  /courses:
    get:
      tags:
        - Courses
      summary: List semua kursus
      responses:
        '200':
          description: List kursus
    post:
      tags:
        - Courses
      summary: Buat kursus baru
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - title
                - description
                - category_id
              properties:
                title:
                  type: string
                description:
                  type: string
                category_id:
                  type: integer
                price:
                  type: number
      responses:
        '201':
          description: Kursus berhasil dibuat

  /courses/{id}:
    get:
      tags:
        - Courses
      summary: Dapatkan detail kursus
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Detail kursus
        '404':
          description: Kursus tidak ditemukan

```

---

### **Security Scheme**

Jika kamu menggunakan JWT (token):

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

```

---

## SAMPLE STRUCTURE PROJECT

## 1. **Struktur Folder DDD (NestJS)**

```
src/
│
├── modules/
│   ├── auth/
│   │   ├── application/
│   │   │   └── use-cases/
│   │   ├── domain/
│   │   │   └── entities/
│   │   └── infrastructure/
│   │       └── controllers/
│   │       └── services/
│   ├── users/
│   ├── courses/
│   ├── payments/
│   └── enrollments/
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── utils/
│
├── config/
│   └── drizzle.config.ts
│   └── database.module.ts
│
├── main.ts
└── app.module.ts

```

---

## 2. **Contoh Struktur Drizzle ORM (Schema)**

```tsx
// src/modules/courses/infrastructure/schema/course.schema.ts
import { pgTable, varchar, integer, serial, timestamp } from 'drizzle-orm/pg-core'

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 1000 }),
  categoryId: integer('category_id'),
  price: integer('price'),
  createdAt: timestamp('created_at').defaultNow(),
})

```

> Drizzle punya pendekatan declarative, cocok untuk typed NestJS apps.
> 

---

## 3. **Integrasi Swagger (OpenAPI) di NestJS**

```tsx
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('Online Course API')
  .setDescription('API dokumentasi untuk platform kursus')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api/docs', app, document)

```

> Gunakan decorators seperti @ApiTags(), @ApiBearerAuth(), @ApiResponse() di controller-mu.
> 

---

## 4. **Docker Compose Setup**

### `docker-compose.yml`

```yaml
version: '3.9'
services:
  api:
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - postgres
    environment:
      - DATABASE_URL=postgres://user:pass@postgres:5432/db
    volumes:
      - .:/app

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: db
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    ports:
      - '5050:80'
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin

volumes:
  postgres_data:

```

---

## 5. **Fitur dan Domain Modular**

| Domain | Modul | Use Cases |
| --- | --- | --- |
| Auth | `auth` | register, login, refresh token |
| User | `users` | CRUD profil, get user detail |
| Course | `courses` | create, list, detail, update, delete |
| Enrollment | `enrollments` | enroll user in course (via payment) |
| Payment | `payments` | pay for multiple courses, track status, invoice |
| Lesson | `lessons` | CRUD lesson per course |
| Category | `categories` | list and manage course categories |
| Review | `reviews` | rating & feedback course |

---