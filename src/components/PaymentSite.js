import React from "react";
import Navbar from "./Navbar";
import PaymentForm from "./PaymentForm";

function PaymentSite() {
    return (
        <body className="payment-site">
            <Navbar />
            <PaymentForm />
        </body>
    );
}

export default PaymentSite;