# 🌴 Wander Bali Dreams

**Wander Bali Dreams** adalah website portal wisata Bali yang menampilkan berbagai destinasi menarik lengkap dengan deskripsi, gambar, serta fitur ulasan/review dari pengguna.

Website ini dikembangkan dengan arsitektur **frontend-backend terpisah**, di mana:
- Data destinasi disimpan dalam file statis (JSON)
- Ulasan/review pengguna disimpan secara dinamis menggunakan **MongoDB**

---

## ⚙️ Teknologi yang Digunakan

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), dotenv, CORS  
- **Frontend:** React.js, Vite.js, Tailwind CSS

---

## 🚀 Cara Menjalankan (Local Deployment)

### 1. Clone Repository

```bash
git clone https://github.com/natasyaruilla/WanderBaliDreams.git
cd WanderBaliDreams
```
### 2. Setup & Jalankan Backend

```bash
cd backendwanderbali
npm init -y
npm install express mongoose cors
node server.js
```
### 3. Siapkan file .env di dalam folder backendwanderbali:
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```
### 4. Jalankan Frontend

```bash
cd wanderbalidreams
npm install
npm run dev
```

Buka browser ke 👉 http://localhost:5173


