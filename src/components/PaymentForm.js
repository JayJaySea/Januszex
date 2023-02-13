import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PaymentForm.module.css"

function PaymentForm() {

    const navigate = useNavigate();

    function submitHandler() {
        // Checking if user is not loggedIn 
        navigate("/thankYou");
    };

    return (
        <div className={classes.paymentForm}>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1 className={classes.header}>Payment</h1>
                <div className={classes.formContainer}>
                    <div className={classes.formElem}>
                        <label htmlFor="name">Name</label>
                        <label htmlFor="surname">Surname</label>
                        <input type="text" placeholder="Enter Name" name="name" required />
                        <input type="text" placeholder="Enter Surname" name="surname" required />
                    </div>
                    <div className={classes.formElem}>
                        <label htmlFor="card-numb">Card number</label>
                        <label htmlFor="card-date">Expiration date</label>
                        <input type="text" placeholder="Enter card number" name="card-numb" required />
                        <input type="text" placeholder="MM/YY" name="card-date" required />
                    </div>
                    <div className={classes.formElem}>
                        <label htmlFor="sec-numb">Security number</label>
                        <span></span>
                        <input type="text" placeholder="Enter CVC" name="sec-numb" required />
                    </div>
                </div>
                <div className={classes.btnContainier}>
                    <button className={classes.button} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;