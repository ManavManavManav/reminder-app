import React, { useState } from 'react';
import axios from 'axios';

const ReminderForm = ({ addReminder }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReminder = { title, date, completed: false };
    const response = await axios.post('http://localhost:3000/reminders', newReminder);
    addReminder(response.data);
    setTitle('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full px-3 py-2 border rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full px-3 py-2 border rounded-md"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
