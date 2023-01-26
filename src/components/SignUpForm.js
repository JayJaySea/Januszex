import React from "react";
import { Form, useActionData, useNavigation, json } from 'react-router-dom';

function SignUpForm({ method }) {

  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';

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
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    </div>
  );
}

export default SignUpForm;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  const method = request.method;

  if (mode !== 'login' && mode !== 'signup') {
    mode = 'login';
  }

  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    login: data.get('username'),
    password: data.get('password')
  };

  console.log(data);

  const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json', { //http://localhost:8080/' + mode
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  console.log(authData);
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // soon: manage that token
  return null; //redirect('/');
}