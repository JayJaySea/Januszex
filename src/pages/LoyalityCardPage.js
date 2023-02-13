import React, { useState, useEffect, useCallback } from "react";
import { redirect, json, useRouteLoaderData, defer, useSubmit, Await } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { getAuthToken } from '../util/auth';
import classes from "./LoyalityCardPage.module.css"


function LoyalityCard () {
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const fetchCardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/reservations.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const transformedCard = data.results.map((cardDataTmp) => {
                return {
                  numbOfRes: cardDataTmp.numbOfRes,
                  points: cardDataTmp.points,
                };
              });
              setCardData(transformedCard);

        } catch (error) {
            setError("Something went wrong, try again.");
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        fetchCardData();
    }, [fetchCardData]);


    return (
        <div className={classes.accountContainer}>
            <AccountNav />
            <div className={classes.mainElem}>
            <h1>Karta lojalnościowa</h1>
            <div >
                <ul>
                    <li>Liczba rezerwacji: {cardData.numbOfRes}</li>
                    <li>Liczba punktów: {cardData.points}</li>
                </ul>
            </div>
            </div>
        </div>
    );

}

export default LoyalityCard;