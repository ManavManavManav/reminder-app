import React, { useState, useEffect } from 'react';

const ReminderForm = ({ addReminder, updateReminder, editingReminder }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingReminder) {
      setTitle(editingReminder.title);
      setDate(editingReminder.date.split('T')[0]); // Format date correctly for input type="date"
    } else {
      setTitle('');
      setDate('');
    }
  }, [editingReminder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReminder = { title, date, completed: false };
    if (editingReminder) {
      newReminder._id = editingReminder._id;
      await updateReminder(newReminder);
    } else {
      await addReminder(newReminder);
    }
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
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {editingReminder ? 'Update Reminder' : 'Add Reminder'}
      </button>
    </form>
  );
};

export default ReminderForm;
