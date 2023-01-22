import React, { useState, useRef } from "react";

function PersInfoForm(props) {

    const [agreement, setAgreement] = useState(false);

    const ifCreateAcc = (event) => {
        setAgreement(event.target.checked);
    }

    const nameRef = useRef('');
    const surnameRef = useRef('');
    const drivLicNumbRef = useRef('');
    const licCategNumbRef = useRef('');
    const usernameRef = useRef('');
    const passwordRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();
        // could add validation here...

        const tmpUser = {
            username: usernameRef.current.value !== null ? usernameRef.current.value : null,
            password: passwordRef.current.value !== null ? passwordRef.current.value : null,
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            drivLic: drivLicNumbRef.current.value,
            licCateg: licCategNumbRef.current.value
        };
        props.onPersInfoForm(tmpUser);
    }


    return (
        <div className="pi-form" >
            <form onSubmit={submitHandler}>
                <h1>Personal information form</h1>
                <div className="pi-form__container">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder="Enter Name" name="name" ref={nameRef} required />
                    <label htmlFor="surname"><strong>Surname</strong></label>
                    <input type="text" placeholder="Enter Name" name="surname" ref={surnameRef} required />
                    <label htmlFor="driv-lic-numb"><strong>Driving license number</strong></label>
                    <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" ref={drivLicNumbRef} required />
                    <label htmlFor="lic-categ"><strong>Category</strong></label>
                    <input type="text" placeholder="Enter Surname" name="lic-categ" ref={licCategNumbRef} required />
                </div>

                <button type="submit">Submit</button>

                <div className="pi-form__container">
                    <label>
                        <input type="checkbox" name="create-acc" onChange={ifCreateAcc} /> Create account
                    </label>
                </div>
                <div className="loginForm__container-acc">
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" placeholder="Enter Username" name="username" readOnly={!agreement} ref={usernameRef} />
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" readOnly={!agreement} ref={passwordRef} />
                </div>
            </form>
        </div>
    );
}

export default PersInfoForm;