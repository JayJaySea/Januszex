import classes from "./CarCard.module.css";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";



const CarCard = ({ car, showButton }) => {

    const navigate = useNavigate();
    const {isButton, setIsButton} = useState(true);
    //setIsButton(props.showButton);
    function clickHandler() {
        navigate("/reservation", { state: { showButton: false, car: car }});
    }

    return (
        <div className={classes.cardContainer} >
            <div className={classes.card}>
                {
                    //<img src={car.photoURL} width="300" height={200} />
                }
                <img src={car.photoURL}
                    className={classes.image} >

                </img>
                <div className={classes.info}>
                    <div className={classes.data}>
                        <div className={classes.brandAndName}>
                            {car.brand + " " + car.model}
                        </div>
                        <div>{"Seats: " + car.howManySeats}</div>
                        <div>{"Color: " + car.color}</div>
                        <div>{"Comfort: " + car.comfortScale}</div>
                        <div>{"Mileage: " + car.distanceCovered}</div>
                        <div>{"Truck: " + (car.isATruck ? "Yes" : "No")}</div>
                        <div className={classes.price}>{"Price: " + car.price}</div>
                    </div>
                    {showButton &&
                    <div className={classes.buttonContainer}>
                        <button onClick={clickHandler} className={classes.button}>
                            {"Zarezerwuj"}
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>)
}

export default CarCard;