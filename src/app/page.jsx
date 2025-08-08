'use client';

import { useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan pada server.');
      }
      
      setResponse(data.reply); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secure Web with Docker Secret</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="border p-2 rounded"
          placeholder="Tulis pesan di sini..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          required
        />
        <button 
          className="bg-blue-500 text-white py-2 rounded cursor-pointer disabled:bg-blue-300" 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </button>

        {/* Tampilkan pesan sukses atau error */}
        {response && <p className="text-green-600 mt-2">✔ {response}</p>}
        {error && <p className="text-red-600 mt-2">❌ {error}</p>}
      </form>
    </main>
  );
}