import React, { useState, useEffect, useCallback } from "react";

function LoginForm() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);


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
          passwordDB: data[key].password
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


  //check with users from database
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { username, password } = document.forms[0];

    // Compare user info
    if (users.find((user) => user.usernameDB == username.value)) {
      if (users.find((user) => user.passwordDB == password.value)) {
        setError(null);
        setIsSubmitted(true);
      } else {
        // Invalid password
        setError("invalid password");
      }
    } else {
      // Username not found
      setError("invalid username");
    }
  };


  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="login-form__container">
          <label htmlFor="username"><strong>Username</strong></label>
          <input type="text" placeholder="Enter Username" name="username" required />
          <label htmlFor="password"><strong>Password</strong></label>
          <input type="password" placeholder="Enter Password" name="password" required />
          <p>{error}</p>
        </div>
        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default LoginForm;