import React from "react";

function PresInfoPanel({ user }) {

  

    return (
        <div className="pers-info">
          <div className="username">username: {user.username}</div>
          <div className="email">email: {user.email}</div>
          <div className="name">name: {user.name}</div>
          <div className="surname">surname: {}</div>
          <div className="driving-license">driving license: {user.drivLic}</div>
          <div className="lic-categ">driving license categories: {user.licCateg}</div>
          
        </div>
    );
}

export default PresInfoPanel;