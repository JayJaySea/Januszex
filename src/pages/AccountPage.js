import React from "react";
import { redirect, json, useRouteLoaderData, defer, useSubmit, Await } from "react-router-dom";
import PersInfoPanel from "../components/PersInfoPanel";
import { getAuthToken } from '../util/auth';

function AccountPage() {


  const { user } = useRouteLoaderData('user-detail');

  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }



  return (
    <div className="account-page">
      <h1>Your account</h1>
      <Await resolve={user}>
      {(loadedUser) => <PersInfoPanel user={loadedUser} />}
      </Await>
      <button onClick={startDeleteHandler}>Delete</button>
    </div>
  );
}

export default AccountPage;

async function loadUser(id) {
  const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json' );//+ id

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected user.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    const user = { //delete that later
      username: 'username',
      email: 'email',
      name: 'name',
      surname: 'surname',
      drivLic: 'hh',
      licCateg: 'fgf'
    };
    return user; //delete that later
    //return resData.user;
  }
}

export async function loader({ request, params }) {
  const id = params.userId;

  return defer({
    user: await loadUser(id)
  });
}

export async function action({ params, request }) {
  const userId = params.userId;

  const token = getAuthToken();
  const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete user.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/');
}