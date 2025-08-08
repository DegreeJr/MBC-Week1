import { NextResponse } from 'next/server';
import redis from '@/lib/redis'; // Impor koneksi redis yang sudah dikonfigurasi

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong.' },
        { status: 400 }
      );
    }

    // Coba simpan pesan ke dalam list 'messages' di Redis
    await redis.lpush('messages', message);
    console.log(`Pesan "${message}" berhasil disimpan ke Redis.`);

    const replyMessage = `Pesan Anda "${message}" telah berhasil disimpan!`;
    return NextResponse.json({ reply: replyMessage });

  } catch (redisError) {
    console.error('API Error: Gagal menyimpan ke Redis:', redisError.message);
    return NextResponse.json(
      { error: 'Tidak dapat terhubung atau menyimpan ke database Redis. Pastikan Redis berjalan dan konfigurasi benar.' },
      { status: 500 }
    );
  }
}