import React from "react";
import PageNav from "../components/Navbar";
import PersInfoForm from "../components/PersInfoForm";

function PersInfoPage() {

    async function sendPersInfoHandler(user) {
        const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="pers-info-page">
            <PageNav />
            <PersInfoForm onPersInfoForm={sendPersInfoHandler} />
        </div>
    )
}

export default PersInfoPage;