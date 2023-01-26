import React, {useCallback, useState, useEffect} from "react";

function PresInfoPanel() {

    const [agreement, setAgreement] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ifCreateAcc = (event) => {
        setAgreement(event.target.checked);
    }


    //get users from database
    const fetchUserHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/users.json');
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const data = await response.json();
    
          const loadedUser = [];
    
          for (const key in data) {
            loadedUser.push({
              id: key,
              usernameDB: data[key].username,
              emailDB: data[key].email,
              nameDB: data[key].name,
              surnameDB: data[key].surname,
              drivLicDB: data[key].drivLic,
              licCategDB: data[key].licCateg
            });
          }
    
          setUser(loadedUser);
        } catch (error) {
          setError("Something went wrong, try again.");
        }
        setIsLoading(false);
      }, []);
    
      useEffect(() => {
        fetchUserHandler();
      }, [fetchUserHandler]);



    return (
        <div className="pers-info">
          <div className="username">username: {user.usernameDB}</div>
          <div className="email">email: {user.emailDB}</div>
          <div className="name">name: {user.nameDB}</div>
          <div className="surname">surname: {}</div>
          <div className="driving-license">driving license: {user.drivLicDB}</div>
          <div className="lic-categ">driving license categories: {user.licCategDB}</div>
        </div>
    );
}

export default PresInfoPanel;