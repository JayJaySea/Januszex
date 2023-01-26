import React from "react";
import Navbar from "../components/Navbar";
import PaymentForm from "../components/PaymentForm";

function PaymentPage() {
    return (
        <body className="payment-page">
            <Navbar />
            <PaymentForm />
        </body>
    );
}

export default PaymentPage;