import Redis from 'ioredis';
import fs from 'fs'; // Impor modul 'fs' untuk membaca file

let redisPassword = null;

// Cek jika variabel lingkungan REDIS_PASSWORD_FILE ada (saat berjalan di Docker)
if (process.env.REDIS_PASSWORD_FILE) {
  try {
    // Baca isi file password yang path-nya diberikan oleh Docker Secret
    redisPassword = fs.readFileSync(process.env.REDIS_PASSWORD_FILE, 'utf8').trim();
    console.log("Konfigurasi: Menggunakan password dari Docker Secret.");
  } catch (err) {
    console.error("ERROR: Gagal membaca file password dari secret:", err);
  }
} else {
  console.log("Konfigurasi: Menjalankan tanpa password (mode development lokal).");
}

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: redisPassword, // Gunakan password yang dibaca dari file
});

redis.on('connect', () => {
  console.log('STATUS: Berhasil terhubung ke Redis!');
});

redis.on('error', (err) => {
  console.error('STATUS: Koneksi Redis Gagal:', err.message);
});

export default redis;