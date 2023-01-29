import React, { useState, useRef, useEffect, useCallback } from "react";
import classes from "./PersInfoForm.module.css";

function PersInfoForm(props) {

  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ifCreateAcc = (event) => {
    setAgreement(event.target.checked);
  }


  //get users from database
  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedUsers = [];

      for (const key in data) {
        loadedUsers.push({
          id: key,
          usernameDB: data[key].username,
          emailDB: data[key].email
        });
      }

      setUsers(loadedUsers);
      console.log(loadedUsers);
    } catch (error) {
      setError("Something went wrong, try again.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);


  const nameRef = useRef('');
  const surnameRef = useRef('');
  const emailRef = useRef('');
  const drivLicNumbRef = useRef('');
  const licCategNumbRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();
    // could add validation here...

    // Compare user info
    if (users.find((user) => user.usernameDB != usernameRef.current.value)) {
      if (users.find((user) => user.emailDB != emailRef.current.value)) {
        setError(null);
        setIsSubmitted(true);
      } else {
        // Invalid password
        setError("Account already exists for this e-mail!");
        return;
      }
    } else {
      // Username not found
      setError("Username already exists!");
      return;
    }


    const tmpUser = {
      username: usernameRef.current.value !== null ? usernameRef.current.value : null,
      password: passwordRef.current.value !== null ? passwordRef.current.value : null,
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
            <input type="text" placeholder="Enter Name" name="surname" ref={surnameRef} required />
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

        <div className={classes.additional}>
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