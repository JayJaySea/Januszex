import React, { useRef, useState } from "react";
import DatePicker from "../components/DatePicker";
import { useLocation, useRouteLoaderData, useNavigate } from 'react-router-dom'
import CarCard from "../components/CarCard";
import classes from "./ReservationPage.module.css";

function ReservationPage(props) {

    const token = 'null'; //useRouteLoaderData('root');
    const location = useLocation();
    const navigate = useNavigate();

    const [reservData, setReservData] = useState('');
    const [carData, setCarData] = useState(location.state?.car ?? {});
    const [dates, setDates] = useState('');

    const nameRef = useRef('');
    const surnameRef = useRef('');
    const emailRef = useRef('');
    const drivLicNumbRef = useRef('');
    const licCategNumbRef = useRef('');

    function datePickerHandler(dates) {
        setDates(dates);
        const resData = {
            rentDate: dates.startDate,
            returnDate: dates.endDate,
            carID: carData.id
        }
        setReservData(resData);
    }

    async function submitHandler(e) {
        e.preventDefault();
        const persInfo = {
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            drivingLicense: drivLicNumbRef.current.value,
            licCategNumb: licCategNumbRef.current.value,
            role: 1
        }
        const all = {
            user: persInfo,
            reserve: reservData
        }

        const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(!token ? all : reservData),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        console.log((parseInt(dates.endDate.slice(8,10)) - parseInt(dates.startDate.slice(8,10))));
        navigate("/payment", {state: { numbOfDays: (parseInt(dates.endDate.slice(8,10)) - parseInt(dates.startDate.slice(8,10))), price: carData.price}});
    }

    return (
        <div className="pers-info-page">
            <CarCard car={carData} showButton={location.state?.showButton ?? false} />
            <form onSubmit={submitHandler}>
                <DatePicker onDatePicker={datePickerHandler} />
                {!token &&
                    <div className={classes.piForm} >
                        <h1>Personal information form</h1>
                        <div className={classes.required}>
                            <h2>Full name</h2>
                            <div className={classes.formElem}>
                                <input type="text" placeholder="Enter Name" name="name" ref={nameRef} required />
                                <input type="text" placeholder="Enter Surname" name="surname" ref={surnameRef} required />
                                <label htmlFor="name"><strong>Name</strong></label>
                                <label htmlFor="surname"><strong>Surname</strong></label>
                            </div>

                            <div className={classes.formElem}>
                                <input type="email" placeholder="Enter E-mail" name="email" ref={emailRef} required />
                                <span></span>
                                <label htmlFor="email"><strong>E-mail</strong></label>
                            </div>

                            <h2>Driving license information</h2>
                            <div className={classes.formElem}>
                                <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" ref={drivLicNumbRef} required />
                                <input type="text" placeholder="Enter Surname" name="lic-categ" ref={licCategNumbRef} required />
                                <label htmlFor="driv-lic-numb"><strong>Driving license number</strong></label>
                                <label htmlFor="lic-categ"><strong>Category</strong></label>
                            </div>
                        </div>
                    </div>
                }
                <button type="submit">Zarezerwuj</button>
            </form>
        </div>
    )
}

export default ReservationPage;


