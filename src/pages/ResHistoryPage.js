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
            const response = await fetch('/reservation_history');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedReserv = [];

            for (const key in data) {
                loadedReserv.push({
                    id: data[key].id,
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
    const currDate = current.getFullYear() + '-' + addZero(current.getMonth() + 1) + (current.getMonth() + 1) + '-' + addZero(current.getDate()) + (current.getDate());

    const submit = useSubmit();

    async function startCancelHandler(id) {
        const proceed = window.confirm('Jesteś pewny?');
        const idToSend = {
            id: id
        };
        if (proceed) {
            const response = await fetch('/delete_reserve', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(idToSend),
            });

            const modResponse = response.json();

            for (let i = 1; i <= 9; i++) {
                if (modResponse.error_id === i) {
                    error = modResponse.msg;
                    return error;
                }
            }


            if (!response.ok) {
                throw json({ message: 'Something went wrong.' }, { status: 500 });
            }

            return null;//redirect('/events');
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
                            <li key={res.id} className={classes.reservation}>
                                <div className={classes.elem}>Numer rezerwacji: {res.id}</div>
                                <div className={classes.elem}>Samochód: {res.carName}</div>
                                <div className={classes.elem}>Cena: {res.price}</div>
                                <div className={classes.elem}>Data rozpoczęcia wypożyczenia: {res.startDate}</div>
                                <div className={classes.elem}>Data zakończenia wypożyczenia: {res.endDate}</div>
                                {(res.startDate > currDate) && res.isActive &&
                                    <form className={classes.btnContainer} onSubmit={() => startCancelHandler(res.id)}>
                                        <button className={classes.btnSubmit} type='submit'>Anuluj rezerwację</button>
                                    </form>}
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
    const reservId = request.id;
    console.log(reservId);

    const response = await fetch('/delete_reserve', {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    return null;//redirect('/events');
}
