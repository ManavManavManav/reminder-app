import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import './index.css';

const App = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reminders`);
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };
    fetchReminders();
  }, []);

  const addReminder = async (reminder) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reminders`, reminder, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setReminders([...reminders, response.data]);
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
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
