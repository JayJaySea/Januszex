import React, { useRef, useState } from "react";
import { json } from "react-router-dom"
import classes from "./PersInfoPanel.module.css";

function PresInfoPanel({ user }) {
  const nameRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const surnameRef = useRef('');
  const emailRef = useRef('');
  const drivLicNumbRef = useRef('');
  const licCategNumbRef = useRef('');

  const [error, setError] = useState();

  async function SubmitHandler() {

    const data = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      login: usernameRef.current.value,
      password: passwordRef.current.value,
      drivingLicense: drivLicNumbRef.current.value,
      licCategoryNumber: licCategNumbRef.current.value,
    };

    const response = await fetch("/update_profile", { //http://localhost:8080/" + mode
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const modResponse = response.json();

    for (let i = 1; i <= 9; i++) {
      if (modResponse.error_id === i) {
        setError(modResponse.msg);
        return;
      }
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    alert('Dane zmienione');
  };

  console.log(user);
  return (
    <div className={classes.panelContainer}>
      <form onSubmit={SubmitHandler}>
        <div className={classes.formElements}>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input type='text' name="username" value={user.username} ref={usernameRef} required></input>
          <label htmlFor="email">E-mail:</label>
          <input type='text' name="email" value={user.email} ref={emailRef} required></input>
          <label htmlFor="name">Imię:</label>
          <input type='text' name="name" value={user.name} ref={nameRef} required></input>
          <label htmlFor="surname">Nazwisko:</label>
          <input type='text' name="surname" value={user.surname} ref={surnameRef} required></input>
          <label htmlFor="drivLic">Numer prawo jazdy:</label>
          <input type='text' name="drivLic" value={user.drivLic} ref={drivLicNumbRef} required></input>
          <label htmlFor="licCateg">Kategoria prawo jazdy:</label>
          <input type='text' name="licCateg" value={user.licCateg} ref={licCategNumbRef} required></input>
          <label htmlFor="password">Hasło:</label>
          <input type='password' name="password" ref={passwordRef} required></input>
        </div>
        <div className={error ? classes.errorContainer : classes.errorContainerInvisible}>{error && <div className={classes.error}>{error}</div>}</div>
        <div className={classes.btnContainer}><button className={classes.btnSubmit} type='submit'>Zmień dane</button></div>
      </form>
    </div>
  );
}

export default PresInfoPanel;
