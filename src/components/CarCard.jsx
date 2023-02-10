import classes from "./CarCard.module.css";

const CarCard = ({car})=>{
    return (
    <div className={classes.cardConteiner} >
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
                <div className={classes.buttonContainer}>
                    <button className={classes.button}>
                        {"Zarezer"}
                    </button>
                </div>
            </div>
        </div>
    </div>) 
}

export default CarCard