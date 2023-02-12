import React from "react";
import { useActionData, useNavigation, Form, json } from 'react-router-dom';
function LoginForm({method}) {

  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="login-form">
      <Form method={method}>
        <h1>Login Form</h1>
        <div className="login-form__container">
          <label htmlFor="username"><strong>Username</strong></label>
          <input type="text" placeholder="Enter Username" name="username" required />
          <label htmlFor="password"><strong>Password</strong></label>
          <input type="password" placeholder="Enter Password" name="password" required />
        </div>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

      </Form>
    </div>
  );
}

export default LoginForm;

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
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());


  return null; //redirect('/');
}