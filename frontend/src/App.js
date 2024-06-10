import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import './index.css';

const App = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const response = await axios.get('http://localhost:3000/reminders');
      setReminders(response.data);
    };
    fetchReminders();
  }, []);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reminders</h1>
      <ReminderForm addReminder={addReminder} />
      <ReminderList reminders={reminders} />
    </div>
  );
};

export default App;
