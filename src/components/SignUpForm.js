import React, { useState, useRef, useEffect, useCallback  } from "react";

function SignUpForm(props) {


    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const emailRef = useRef('');
    const usernameRef = useRef('');
    const passwordRef = useRef('');
  
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
            emailDB: data[key].email
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
  

    function submitHandler(event) {
        event.preventDefault();
        // could add validation here...

        // Compare user info
        if (users.find((user) => user.usernameDB != usernameRef.current.value)) {
          if (users.find((user) => user.emailDB != emailRef.current.value)) {
            setError(null);
            setIsSubmitted(true);
          } else {
            // Invalid password
            setError("Account already exists for this e-mail!");
            return;
          }
        } else {
          // Username not found
          setError("Username already exists!");
          return;
        }


        const tmpUser = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        };
        props.onSignUpForm(tmpUser);
    }


    return (
        <div className="pi-form" >
            <form onSubmit={submitHandler}>
                <h1>Sign up</h1>
                <div className="pi-form__container">
                    <label htmlFor="email"><strong>E-mail</strong></label>
                    <input type="email" placeholder="Enter E-mail" name="email" ref={emailRef} required />
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input type="text" placeholder="Enter Username" name="username" ref={usernameRef} />
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" ref={passwordRef} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUpForm;