import React from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

function PaymentPage() {

    const location = useLocation();

    return (
        <div className="payment-page">
            <h1>Total: {location.state.numbOfDays * location.state.price}</h1>
            <PaymentForm />
        </div>
    );
}

export default PaymentPage;