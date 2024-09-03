// src/components/DatePicker.jsx

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDatePicker({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
  };

  return (
    <div className="date-picker-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
        className="px-4 py-2 border rounded-md"
        minDate={new Date()} // Prevent past dates
      />
    </div>
  );
}

export default MyDatePicker;
