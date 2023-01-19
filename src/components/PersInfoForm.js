import React, { useState } from "react";

function PersInfoForm() {

    const [agreement, setAgreement] = useState(false);

    const ifCreateAcc = (event) => { 
        setAgreement(event.target.checked); 
    }

    return (
        <div className="pi-form" >
             <form >
            <h1>Personal information form</h1>
                <div className="pi-form__container">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder="Enter Name" name="name" required/>
                    <label htmlFor="surname"><strong>Surname</strong></label>
                    <input type="text" placeholder="Enter Name" name="surname" required/>
                    <label htmlFor="driv-license"><strong>Driving license number</strong></label>
                    <input type="text" placeholder="Enter driving license number" name="driv-license" required/>
                    <label htmlFor="license-categ"><strong>Category</strong></label>
                    <input type="text" placeholder="Enter Surname" name="liecense-categ" required/>
                </div>

                <button type="submit">Submit</button>

                <div className="pi-form__container">
                    <label>
                    <input type="checkbox" name="create-acc" onChange={ifCreateAcc}/> Create account 
                    </label>
                </div>
                <div className="loginForm__container-acc">
                <label htmlFor="username"><strong>Username</strong></label>
                <input type="text" placeholder="Enter Username" name="username" readOnly={!agreement}/>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password" name="password" readOnly={!agreement}/>
            </div>
            </form>
        </div>
    );
}

export default PersInfoForm;