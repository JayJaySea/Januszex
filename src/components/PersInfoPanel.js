import React from "react";

function PresInfoPanel({ user }) {

  return (
    <div className="pers-info">
      <div className="username">Nazwa użytkownika: {user.username}</div>
      <div className="email">E-mail: {user.email}</div>
      <div className="name">Imię: {user.name}</div>
      <div className="surname">Nazwisko: {user.surname}</div>
      <div className="driving-license">Numer prawa jazdy: {user.drivLic}</div>
      <div className="lic-categ">Kategoria prawa jazdy: {user.licCateg}</div>

    </div>
  );
}

export default PresInfoPanel;