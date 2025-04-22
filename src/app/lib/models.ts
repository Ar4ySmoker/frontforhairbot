// lib/models.ts
import mongoose, { Schema, model, models } from 'mongoose';

const MasterSchema = new Schema({
  name: String,
  avatar: String,
  price: Number,
  duration: Number, // в минутах
});

const ScheduleSchema = new Schema({
  masterId: { type: Schema.Types.ObjectId, ref: 'Master' },
  date: String, // '2025-04-22'
  slots: [String], // ['10:00', '11:00', ...]
});

const BookingSchema = new Schema({
  userId: String, // из Telegram
  masterId: { type: Schema.Types.ObjectId, ref: 'Master' },
  date: String,
  time: String,
});

export const Master = models.Master || model('Master', MasterSchema);
export const Schedule = models.Schedule || model('Schedule', ScheduleSchema);
export const Booking = models.Booking || model('Booking', BookingSchema);
