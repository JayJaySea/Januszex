import React, { useRef, useState } from "react";
import DatePicker from "../components/DatePicker";
import { useLocation, useRouteLoaderData, useNavigate } from 'react-router-dom'
import CarCardReserv from "../components/CarCardReserv";
import classes from "./ReservationPage.module.css";

function ReservationPage(props) {

    const token = "null"; //useRouteLoaderData('root');
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
    const collectAddressRef = useRef('');

    function datePickerHandler(dates) {
        setDates(dates);
        const resData = {
            rentDate: dates.startDate,
            returnDate: dates.endDate,
            carID: carData.id,
            collectAddress: collectAddressRef.current.value
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
        console.log((parseInt(dates.endDate.slice(8, 10)) - parseInt(dates.startDate.slice(8, 10))));
        navigate("/payment", { state: { numbOfDays: (parseInt(dates.endDate.slice(8, 10)) - parseInt(dates.startDate.slice(8, 10))), price: carData.price } });
    }

    return (
        <div className={classes.reservationPage}>
            <div className={classes.container}>
                <CarCardReserv car={carData} showButton={location.state?.showButton ?? false} />
                <form className={classes.resForm} onSubmit={submitHandler}>
                    <h1 className={classes.header}>Rezerwacja</h1>
                    <span className={classes.line}></span>
                    <DatePicker onDatePicker={datePickerHandler} />
                    {!token &&
                        <div className={classes.piForm} >
                            <span className={classes.line}></span>
                            <h2>Dane osobiste</h2>
                            <div className={classes.required}>
                                <h3>Pełne imię</h3>
                                <div className={classes.formElem}>
                                    <label htmlFor="name">Name</label>
                                    <label htmlFor="surname">Surname</label>
                                    <input type="text" placeholder="Enter Name" name="name" ref={nameRef} required />
                                    <input type="text" placeholder="Enter Surname" name="surname" ref={surnameRef} required />
                                </div>

                                <div className={classes.formElem}>
                                    <label htmlFor="email">E-mail</label>
                                    <span></span>
                                    <input type="email" placeholder="Enter E-mail" name="email" ref={emailRef} required />
                                </div>

                                <h3>Prawo jazdy</h3>
                                <div className={classes.formElem}>
                                    <label htmlFor="driv-lic-numb">Driving license number</label>
                                    <label htmlFor="lic-categ">Category</label>
                                    <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" ref={drivLicNumbRef} required />
                                    <input type="text" placeholder="Enter Surname" name="lic-categ" ref={licCategNumbRef} required />
                                </div>
                            </div>
                        </div>
                    }
                    <span className={classes.line}></span>
                    <h2>Dodatkowe informacje</h2>
                    <label htmlFor="collect-address">Adres odbioru</label>
                    <textarea className="collect-address" placeholder="Write your message" rows="3" ref={collectAddressRef} required></textarea>
                    <label htmlFor="comments">Uwagi do rezerwacji</label>
                    <textarea className="comments" placeholder="Write your message" rows="5"></textarea>
                    <span className={classes.line}></span>
                    <div className={classes.btnContainer}>
                        <button type="submit" className={classes.reservBtn}>Zarezerwuj</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReservationPage;


