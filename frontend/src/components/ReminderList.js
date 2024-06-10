import React from 'react';

const ReminderList = ({ reminders }) => {
  return (
    <ul className="space-y-2">
      {reminders.map((reminder) => (
        <li key={reminder._id} className="p-4 border rounded-md">
          <h3 className="text-xl font-semibold">{reminder.title}</h3>
          <p>{new Date(reminder.date).toLocaleDateString()}</p>
          <p>{reminder.completed ? 'Completed' : 'Pending'}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;
