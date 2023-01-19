import React from "react";
import Navbar from "./Navbar";
import PaymentForm from "./PaymentForm";

function PaymentSite() {
    return (
        <div className="payment-site">
            <Navbar />
            <PaymentForm />
        </div>
    );
}

export default PaymentSite;