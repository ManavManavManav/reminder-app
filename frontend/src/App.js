import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import './index.css';

const App = () => {
  const [reminders, setReminders] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);

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

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/reminders/${id}`);
      setReminders(reminders.filter(reminder => reminder._id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const editReminder = (reminder) => {
    setEditingReminder(reminder);
  };

  const updateReminder = async (updatedReminder) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/reminders/${updatedReminder._id}`, updatedReminder, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setReminders(reminders.map(reminder => reminder._id === updatedReminder._id ? response.data : reminder));
      setEditingReminder(null);
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reminders</h1>
      <ReminderForm 
        addReminder={addReminder} 
        updateReminder={updateReminder} 
        editingReminder={editingReminder} 
      />
      <ReminderList 
        reminders={reminders} 
        deleteReminder={deleteReminder} 
        editReminder={editReminder} 
      />
    </div>
  );
};

export default App;
