import React, { useState, useEffect, useCallback } from "react";

function LoginForm() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedUsers = data.results.map((usersData) => {
        return {
          usernameDB: usersData.username,
          passwordDB: usersData.password,
        };
      });
      setUsers(transformedUsers);
    } catch (error) {
      setError("Something went wrong, try again.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { username, password } = document.forms[0];

    // Compare user info
    if (users.find((user) => user.usernameDB == username.value)) {
      if (users.find((user) => user.passwordDB == password.value)) {
        // Invalid password
        setError("invalid password");
      } else {
        setIsSubmitted(true);
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
                <input type="text" placeholder="Enter Username" name="username" required/>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password" name="password" required/>
                <p>{error}</p>
            </div>
            <button type="submit">Login</button>
            <div className="login-form__container">
                <span className="password"><a href="#"> Forgot password?</a></span>
            </div>
            </form>
        </div>
    );
}

export default LoginForm;