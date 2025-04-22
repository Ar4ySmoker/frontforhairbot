'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !datetime) return;

    // тут можно сделать отправку куда-то

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">BarberStyle</h1>
      <p className="text-lg mb-6 text-gray-300">Запишись на стильную стрижку прямо сейчас</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-3 rounded text-white font-bold"
          >
            Записаться
          </button>
        </form>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-green-400">Спасибо, {name}!</h2>
          <p className="text-gray-300 mt-2">
            Вы записаны на {new Date(datetime).toLocaleString()}.
          </p>
        </div>
      )}
    </main>
  );
}
