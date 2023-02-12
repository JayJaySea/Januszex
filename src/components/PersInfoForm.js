import React, { useState, useRef, useEffect, useCallback } from "react";
import classes from "./PersInfoForm.module.css";

function PersInfoForm(props) {

  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const nameRef = useRef('');
  const surnameRef = useRef('');
  const emailRef = useRef('');
  const drivLicNumbRef = useRef('');
  const licCategNumbRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();
    // could add validation here...

    const tmpUser = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      drivLic: drivLicNumbRef.current.value,
      licCateg: licCategNumbRef.current.value
    };
    props.onPersInfoForm(tmpUser);
  }

  return (
    <div className={classes.piForm} >
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>Personal information form</h1>
        <div className={classes.required}>
          <h2>Full name</h2>
          <div className={classes.formElem}>
            <input type="text" placeholder="Enter Name" name="name" ref={nameRef} required />
            <input type="text" placeholder="Enter Surname" name="surname" ref={surnameRef} required />
            <label htmlFor="name"><strong>Name</strong></label>
            <label htmlFor="surname"><strong>Surname</strong></label>
          </div>
         
          <div className={classes.formElem}>
            <input type="email" placeholder="Enter E-mail" name="email" ref={emailRef} required />
            <span></span>
            <label htmlFor="email"><strong>E-mail</strong></label>
          </div>
      
          <h2>Driving license information</h2>
          <div className={classes.formElem}>
            <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" ref={drivLicNumbRef} required />
            <input type="text" placeholder="Enter Surname" name="lic-categ" ref={licCategNumbRef} required />
            <label htmlFor="driv-lic-numb"><strong>Driving license number</strong></label>
            <label htmlFor="lic-categ"><strong>Category</strong></label>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PersInfoForm;