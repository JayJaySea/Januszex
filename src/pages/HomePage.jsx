import React from "react";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";
import CarCard from "../components/CarCard"
import Filters from "../components/Filters"

const options = [
    {
        howManySeats:5,
        color:"cherry",
        distanceCovered:5000,
        comfortScale:'H',
        brand:"Mercedes",
        model:"Supreme",
        price:999,
        isATruck:false,
        photoURL:"https://www.spa4car.pl/files/realizacje/mercedes_560sec/74956E60-77C6-4F09-92C0-C9D76C2770B5.jpeg",
    },
    {
        howManySeats:6,
        color:"redZone",
        distanceCovered:300000,
        comfortScale:'M',
        brand:"kałdi",
        model:"aBieda",
        price:299,
        isATruck:false,
        photoURL:"https://bidfax.info/uploads/posts/2019-06/25/audi-s3-premium-2015-waubfgff3f1079708-img1.jpg",   
    },
    {
        howManySeats:5,
        color:"pearl White",
        distanceCovered:10000,
        comfortScale:'L',
        brand:"Wolsvagen",
        model:"T5",
        price:800,
        isATruck:true,
        photoURL:"https://otoklasyki.pl/Upload/posters/volkswagen-t3-westfalia-161575376680.jpeg",
    },
    {
        howManySeats:5,
        color:"cherry",
        distanceCovered:5000,
        comfortScale:'H',
        brand:"Mercedes",
        model:"Supreme",
        price:999,
        isATruck:false,
        photoURL:"https://www.spa4car.pl/files/realizacje/mercedes_560sec/74956E60-77C6-4F09-92C0-C9D76C2770B5.jpeg",
    },
    {
        howManySeats:6,
        color:"redZone",
        distanceCovered:300000,
        comfortScale:'M',
        brand:"kałdi",
        model:"aBieda",
        price:299,
        isATruck:false,
        photoURL:"https://bidfax.info/uploads/posts/2019-06/25/audi-s3-premium-2015-waubfgff3f1079708-img1.jpg",   
    },
    {
        howManySeats:5,
        color:"pearl White",
        distanceCovered:10000,
        comfortScale:'L',
        brand:"Wolsvagen",
        model:"T5",
        price:800,
        isATruck:true,
        photoURL:"https://otoklasyki.pl/Upload/posters/volkswagen-t3-westfalia-161575376680.jpeg",
    }
]



function HomePage() {
    return (
        <div className={classes.homePage}>
            {
            /*</div><h1>Hello</h1>
            <ul>
                <li></li>
                    <Link to="/persInfo">Form</Link>
                </li>
                <li>
                    <Link to="/payment">Payment</Link>
                </li>
             </ul>*/}
            <div className={classes.filters}>
                <div className={classes.filtersTitle}>Filters:</div>
                <div className={classes.filtersData}>Brand:</div>
                {
                    Filters(options)
                }
                
            </div>
            <div className={classes.cardsConteiner}>
                {
                    options.map((opt,id)=>{return (<CarCard key={id} car={opt} />)})
                }
            </div>
        </div>

    )
}

export default HomePage;