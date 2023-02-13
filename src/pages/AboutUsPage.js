import classes from "./AboutUsPage.module.css";
import React from "react";

const AboutUs =()=> {
    function onLikeAlert()
    {
        alert("Dziękuję za like, Twoje zdrowie!");
    }

    return(
        <div className={classes.parent}>
            <div className={classes.titleJanuszexCss}>Januszex</div>
            <div className={classes.container}>
                <div className={classes.image}>
                    <img src="https://i.imgur.com/Evk3Nom.png" alt="Tu powinno być nasze logo"></img>
                </div>
                <div className={classes.text}>
                    <p className={classes.header}>
                        Troszeczkę informacji o nas:
                    </p>
                    <p className={classes.about}>
                    Januszex to wypożyczalnia samochodów, która oferuje swoim klientom nie tylko wyjątkowo atrakcyjne ceny, ale również niezwykle szeroki wybór samochodów. Każdy z nich jest regularnie serwisowany i zapewnia nie tylko wysoki poziom bezpieczeństwa, ale również komfort jazdy. Personel wypożyczalni jest bardzo pomocny i zawsze chętnie doradzi w wyborze najlepszego samochodu dla klienta. W Januszex można być pewnym, że wynajem samochodu będzie przebiegał sprawnie i bezproblemowo. To miejsce, w którym wypożyczenie samochodu jest proste i przyjemne!
                    </p>
                </div>
                
            </div>
            <div className={classes.mysteryButton}>
                    <button className={classes.hahaha}>
                        <p>Polub konkurencje na Facebooku</p>
                    </button>
                    <button className={classes.hahaha2} onClick={()=>onLikeAlert()}>
                        <p>Polub nas na Facebooku</p>
                    </button>
            </div> 
                
        </div>
    )
}

export default AboutUs;