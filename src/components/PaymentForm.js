import React from "react";

function PaymentForm() {
    return (
        <div className="payment-form">
            <form >
            <h1>Payment</h1>
            <div className="payment-form__container">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder="Enter Name" name="name" required/>

                <label htmlFor="surname"><strong>Surname</strong></label>
                <input type="text" placeholder="Enter Surname" name="surname" required/>

                <label htmlFor="card-numb"><strong>Card number</strong></label>
                <input type="text" placeholder="Enter card number" name="card-numb" required/>

                <label htmlFor="card-date"><strong>Expiration date</strong></label>
                <input type="text" placeholder="MM/YY" name="card-date" required/>

                <label htmlFor="sec-numb"><strong>Security number</strong></label>
                <input type="text" placeholder="Enter CVC" name="sec-numb" required/>
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default PaymentForm;