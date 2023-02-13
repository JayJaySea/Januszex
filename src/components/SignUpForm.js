import React from "react";
import { Form, useActionData, useNavigation, json } from "react-router-dom";
import classes from "./SignUpForm.module.css"

function SignUpForm({ method }) {

  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={classes.signUpForm} >
      <div className={classes.container}>
        <Form method={method}>
          <h1 className={classes.header}>Zarejestruj się</h1>
          <div className={classes.accountInfo}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="Enter E-mail" name="email" required />
            <label htmlFor="username">Nazwa użytkownika</label>
            <input id="username" type="text" placeholder="Enter Username" name="username" required />
            <label htmlFor="password">Hasło</label>
            <input id="password" type="password" placeholder="Enter Password" name="password" required />
          </div>
          <div className={classes.persInfo}>
            <h2>Personal information form</h2>
            <h3>Full name</h3>
            <div className={classes.formElem}>
              <label htmlFor="name">Imię</label>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" placeholder="Enter Name" name="name" id="name" required />
              <input type="text" placeholder="Enter Surname" name="surname" id="surname" required />
            </div>
            <h3>Driving license information</h3>
            <div className={classes.formElem}>
              <label htmlFor="driv-lic-numb">Numer prawa jazdy</label>
              <label htmlFor="lic-categ">Kategoria prawa jazdy</label>
              <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" id="driv-lic-numb" required />
              <input type="text" placeholder="Enter driving license category" name="lic-categ" id="lic-categ" required />
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  let mode = searchParams.get("mode") || "login";
  const method = request.method;

  if (mode !== "login" && mode !== "signup") {
    mode = "login";
  }

  const data = await request.formData();

  const authData = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    login: data.get("username"),
    password: data.get("password"),
    drivingLicense: data.get("driv-lic-numb"),
    licCategoryNumber: data.get("lic-categ"),
    role: 1
  };

  const response = 
    await fetch("/register", { 
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  console.log(authData);
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  // manage that token
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return null; //redirect("/");
}
