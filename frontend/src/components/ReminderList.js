import React from 'react';

const ReminderList = ({ reminders, deleteReminder, editReminder }) => {
  return (
    <ul className="space-y-2">
      {reminders.map((reminder) => (
        <li key={reminder._id} className="p-4 border rounded-md">
          <h3 className="text-xl font-semibold">{reminder.title}</h3>
          <p>{new Date(reminder.date).toLocaleDateString()}</p>
          <p>{reminder.completed ? 'Completed' : 'Pending'}</p>
          <button 
            onClick={() => editReminder(reminder)} 
            className="px-2 py-1 bg-yellow-500 text-white rounded-md mr-2"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteReminder(reminder._id)} 
            className="px-2 py-1 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ReminderList;
