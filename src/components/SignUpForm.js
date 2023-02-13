import React from "react";
import { Form, useActionData, useNavigation, json } from "react-router-dom";
import classes from "./SignUpForm.module.css"

function SignUpForm({ method }) {

  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="pi-form" >
      <Form method={method}>
        <h1>Sign up</h1>
        <div className="pi-form__container">
          <label htmlFor="email"><strong>E-mail</strong></label>
          <input id="email" type="email" placeholder="Enter E-mail" name="email" required />
          <label htmlFor="username"><strong>Username</strong></label>
          <input id="username" type="text" placeholder="Enter Username" name="username" required />
          <label htmlFor="password"><strong>Password</strong></label>
          <input id="password" type="password" placeholder="Enter Password" name="password" required />
        </div>
        <h2>Personal information form</h2>
          <h3>Full name</h3>
          <div className={classes.formElem}>
            <input type="text" placeholder="Enter Name" name="name" id="name" required />
            <input type="text" placeholder="Enter Surname" name="surname" id="surname" required />
            <label htmlFor="name"><strong>Name</strong></label>
            <label htmlFor="surname"><strong>Surname</strong></label>
          </div>   
          <h3>Driving license information</h3>
          <div className={classes.formElem}>
            <input type="text" placeholder="Enter driving license number" name="driv-lic-numb" id="driv-lic-numb" required />
            <input type="text" placeholder="Enter driving license category" name="lic-categ" id="lic-categ" required />
            <label htmlFor="driv-lic-numb"><strong>Driving license number</strong></label>
            <label htmlFor="lic-categ"><strong>Category</strong></label>
          </div>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
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