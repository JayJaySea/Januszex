import React, { useRef, useState } from 'react';
import classes from './DatePicker.module.css';

function DatePicker() {

    const current = new Date();
    function addZero(numb) {
        return (numb < 10) ? '0' : ''
    }
    const currDate = current.getFullYear() + '-' + addZero(current.getMonth()+1) + (current.getMonth()+1) + '-' + current.getDate();

    const [startDate, setStartDate] = useState('');
    const startDateRef = useRef(null);
    const [endDate, setEndDate] = useState('');
    const endDateRef = useRef(null);

    const handleStartChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className={classes.datePicker}>
        <h1>Wybierz daty rezerwacji</h1>
            <label htmlFor="from">Rezerwacja od:</label>
            <input type="date" id="from" name="from" min={currDate} onChange={handleStartChange} ref={startDateRef} />
            <label htmlFor="to">Rezerwacja do:</label>
            <input type="date" id="to" name="to" min={startDate} onChange={handleEndChange} ref={endDateRef} />
        </div>
    );

}

export default DatePicker;