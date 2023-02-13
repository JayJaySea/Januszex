import React, { useState, useEffect, useCallback } from "react";
import { redirect, json, useRouteLoaderData, defer, useSubmit, Await } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { getAuthToken } from '../util/auth';
import classes from "./ResHistoryPage.module.css"

function ResHistoryPage() {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchReservationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/reservations.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            //console.log(data);
            const loadedReserv = [];

            for (const key in data) {
                loadedReserv.push({
                    id: key,
                    reserveID: data[key].reserveID,
                    carName: data[key].carName,
                    price: data[key].price,
                    startDate: data[key].rentDate,
                    endDate: data[key].returnDate,
                    isActive: data[key].isActive
                });
            }

            setReservations(loadedReserv);
            console.log(loadedReserv);
        } catch (error) {
            setError("Something went wrong, try again.");
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        fetchReservationsHandler();
    }, [fetchReservationsHandler]);

    const current = new Date();
    function addZero(numb) {
        return (numb < 10) ? '0' : ''
    }
    const currDate = current.getFullYear() + '-' + addZero(current.getMonth() + 1) + (current.getMonth() + 1) + '-' + addZero(current.getDate());

    const submit = useSubmit();

    function startCancelHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit(null, { method: 'patch' });
        }
    }

    return (
        <div className={classes.accountContainer}>
            <AccountNav />
            <div className={classes.mainElem}>
                <h1>Twoje rezerwacje</h1>
                <div >
                    <ul>
                        {reservations.map((res) => (
                            <li className={classes.reservation} key={res.id}>
                                <div className={classes.elem}>Numer rezerwacji: {res.id}</div>
                                <div className={classes.elem}>Samochód: {res.carName}</div>
                                <div className={classes.elem}>Cena: {res.price}</div>
                                <div className={classes.elem}>Data rozpoczęcia wypożyczenia: {res.startDate}</div>
                                <div className={classes.elem}>Data zakończenia wypożyczenia: {res.endDate}</div>
                                {(res.startDate > currDate) && res.isActive &&
                                    <div className={classes.btnContainer}>
                                        <button className={classes.btnSubmit} onClick={startCancelHandler}>Anuluj rezerwację</button>
                                    </div>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default ResHistoryPage;

export async function action({ params, request }) {
    const method = request.method;
    const data = await request.formData();
    const reservId = params.reserveID;

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };

    let url = 'http://localhost:8080/events';

    if (method === 'PATCH') {
        const eventId = params.reservId;
        url = 'http://localhost:8080/events/' + reservId;
    }

    const token = getAuthToken();
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    return redirect('/events');
}