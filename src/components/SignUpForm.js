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
            <input id="email" type="email" placeholder="Wpisz adres e-mail" name="email" required />
            <label htmlFor="username">Nazwa użytkownika</label>
            <input id="username" type="text" placeholder="Wpisz nazwę użytkownika" name="username" required />
            <label htmlFor="password">Hasło</label>
            <input id="password" type="password" placeholder="Wpisz hasło" name="password" required />
          </div>
          <div className={classes.persInfo}>
            <h2>Formularz danych osobowych</h2>
            <h3>Dane osobowe</h3>
            <div className={classes.formElem}>
              <label htmlFor="name">Imię</label>
              <label htmlFor="surname">Nazwisko</label>
              <input type="text" placeholder="Wpisz imię" name="name" id="name" required />
              <input type="text" placeholder="Wpisz nazwisko" name="surname" id="surname" required />
            </div>
            <h3>Informacje o prawo jazdy</h3>
            <div className={classes.formElem}>
              <label htmlFor="driv-lic-numb">Numer prawa jazdy</label>
              <label htmlFor="lic-categ">Kategoria prawa jazdy</label>
              <input type="text" placeholder="Wpisz numer prawa jazdy" name="driv-lic-numb" id="driv-lic-numb" required />
              <input type="text" placeholder="Wpisz kategorię prawa jazdy" name="lic-categ" id="lic-categ" required />
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.btnSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij"}
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
  const mode = searchParams.get("mode") || "login";
  const method = request.method;

  if (mode !== "login" && mode !== "signup") {
    mode = "login";
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    login: data.get("username"),
    password: data.get("password"),
    name: data.get("name"),
    surname: data.get("surname"),
    drivLicNumb: data.get("driv-lic-numb"),
    licCateg: data.get("lic-categ")
  };

  const response = await fetch("https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json", { //http://localhost:8080/" + mode
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