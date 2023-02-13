import React from "react";
import PersInfoForm from "../components/PersInfoForm";
import DatePicker from "../components/DatePicker";
import { useLocation, useRouteLoaderData } from 'react-router-dom'
import CarCard from "../components/CarCard";

const PersInfoPage = props => {

    const token = 'fgfdf'; //useRouteLoaderData('root');
    const location = useLocation();
    console.log(location.state.car.id)

    async function sendPersInfoHandler(user) {
        const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
    }

    return (
        <div className="pers-info-page">
        <CarCard car={location.state.car} showButton={location.state.showButton}/>
            <DatePicker />
            {!token &&
            <PersInfoForm onPersInfoForm={sendPersInfoHandler} />
            }
        </div>
    )
}

export default PersInfoPage;