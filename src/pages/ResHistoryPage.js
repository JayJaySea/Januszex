import React, { useState, useEffect, useCallback } from "react";
import { redirect, json, useRouteLoaderData, defer, useSubmit, Await } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { getAuthToken } from '../util/auth';

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

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }

    return (
        <div className="account-page">
            <AccountNav />
            <h1>Twoje rezerwacje</h1>
            <div >
                <ul>
                    {reservations.map((res) => (
                        <li key={res.id}>
                            <div>Numer rezerwacji: {res.id}</div>
                            <div>Samochód: {res.carName}</div>
                            <div>Cena: {res.price}</div>
                            <div>Data rozpoczęcia wypożyczenia: {res.startDate}</div>
                            <div>Data zakończenia wypożyczenia: {res.endDate}</div>
                            {res.startDate > currDate &&
                                <button onClick={startDeleteHandler}>Anuluj rezerwację</button>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default ResHistoryPage;

export async function action({ params, request }) {
    const reservId = params.reserveID;
  
    const token = getAuthToken();
    const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/reservations/' + reservId, {
      method: request.method,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  
    if (!response.ok) {
      throw json(
        { message: 'Could not cancel reservation.' },
        {
          status: 500,
        }
      );
    }
    return null;
  }