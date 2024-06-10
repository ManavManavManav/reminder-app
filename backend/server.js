const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://manav:manav124@cluster0.dlwklmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reminderSchema = new mongoose.Schema({
  title: String,
  date: Date,
  completed: Boolean,
});

const Reminder = mongoose.model('Reminder', reminderSchema);

app.get('/reminders', async (req, res) => {
  const reminders = await Reminder.find();
  res.json(reminders);
});

app.post('/reminders', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Error adding reminder" });
  }
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
