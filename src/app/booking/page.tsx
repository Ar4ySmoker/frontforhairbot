// app/booking/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Master {
  _id: string;
  name: string;
  avatar: string;
  price: number;
  duration: number;
}

export default function BookingPage() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [masters, setMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);

  const availableDates = [20, 21, 22, 26, 27, 28, 29];
  const availableTimes = ['19:15', '21:15'];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      telegram.expand();
      setTg(telegram);
    }
  }, []);

  useEffect(() => {
    const fetchMasters = async () => {
      const res = await fetch('/api/masters');
      const data = await res.json();
      if (data.success) setMasters(data.masters);
    };
    fetchMasters();
  }, []);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedMaster || !tg) return;
    const bookingData = {
      master: selectedMaster.name,
      date: `${selectedDate} апреля`,
      time: selectedTime,
      price: selectedMaster.price,
      duration: selectedMaster.duration,
    };
    tg.sendData(JSON.stringify(bookingData));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Выбор времени для стрижки</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {['Апрель', 'Май', 'Утро', 'День', 'Вечер', 'Ночь', 'Выходные'].map((filter) => (
          <button
            key={filter}
            className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto mb-6">
        {availableDates.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`min-w-[56px] p-2 rounded-xl text-center ${day === selectedDate ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
          >
            <div className="text-xs font-semibold">ВС</div>
            <div className="text-sm">{day} АПР.</div>
          </button>
        ))}
      </div>

      {masters.map((master) => (
        <div
          key={master._id}
          onClick={() => setSelectedMaster(master)}
          className={`bg-white p-4 rounded-xl shadow mb-4 cursor-pointer border ${selectedMaster?._id === master._id ? 'border-black' : 'border-transparent'}`}
        >
          <div className="flex items-center gap-4 mb-3">
            <img
              src={master.avatar || '/barber.jpg'}
              alt={master.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{master.name}</div>
              <div className="text-sm text-gray-500">от {master.price}₽ · {master.duration} мин</div>
            </div>
          </div>

          <div className="flex gap-4 mb-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`border px-4 py-2 rounded-xl ${time === selectedTime ? 'bg-black text-white' : ''}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!selectedDate || !selectedTime || !selectedMaster}
        className={`w-full mt-2 py-2 rounded-xl font-medium text-white transition ${selectedDate && selectedTime && selectedMaster ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Записаться
      </button>
    </div>
  );
}