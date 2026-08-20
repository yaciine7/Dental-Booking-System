require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Appointment, ContactMessage } = require('./Modules/schema.js');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dental-clinic';

app.use(cors());
app.use(express.json());

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

connectDb();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dental API is running' });
});


app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
});

app.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointment', error: error.message });
  }
});

app.post('/appointments', async (req, res) => {
  try {
    const { fullName, phone, email, service, date, time, message } = req.body;

    if (!fullName || !phone || !email || !service || !date || !time) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const conflict = await Appointment.findOne({
      date,
      time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflict) {
      return res.status(409).json({
        message: 'This time slot is already booked for this service',
      });
    }

    const appointment = await Appointment.create({
      fullName,
      phone,
      email,
      service,
      date,
      time,
      message: message || '',
    });

    res.status(201).json(appointment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'This time slot is already booked for this service',
      });
    }
    res.status(500).json({ message: 'Failed to create appointment', error: error.message });
  }
});

app.put('/appointments/:id', async (req, res) => {
  try {
    const { date, time } = req.body;

    // Only re-check for conflicts if this update touches service/date/time
    if (date || time) {
      const current = await Appointment.findById(req.params.id);
      if (!current) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      const conflict = await Appointment.findOne({
        _id: { $ne: req.params.id },
        date: date || current.date,
        time: time || current.time,
        status: { $in: ['pending', 'confirmed'] },
      });

      if (conflict) {
        return res.status(409).json({
          message: 'This time slot is already booked for this service',
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updatedAppointment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'This time slot is already booked for this service',
      });
    }
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
  }
});

app.delete('/appointments/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully', deletedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
});

app.get('/contact', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact messages', error: error.message });
  }
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      message,
    });

    res.status(201).json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send contact message', error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

module.exports = app;