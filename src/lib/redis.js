import Redis from 'ioredis';

// Langsung membaca password dari variabel lingkungan (environment variable)
const redisPassword = process.env.REDIS_PASSWORD || null;

if (redisPassword) {
  console.log("Konfigurasi: Menggunakan password dari environment variable.");
} else {
  console.log("Konfigurasi: Menjalankan tanpa password (mode development lokal).");
}

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: redisPassword, // Menggunakan password dari environment variable
});

redis.on('connect', () => {
  console.log('STATUS: Berhasil terhubung ke Redis!');
});

redis.on('error', (err) => {
  console.error('STATUS: Koneksi Redis Gagal:', err.message);
});

export default redis;