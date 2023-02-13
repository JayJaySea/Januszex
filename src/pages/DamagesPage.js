import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";


function DamagesPage() {

    const navigate = useNavigate();
  const reserveIDRef = useRef('');
  const damageRef = useRef('');


  async function submitHandler(e) {
    e.preventDefault();
    const tmpData = {
        description: damageRef.current.value
    }
    
    const response = await fetch('https://januszex-d2112-default-rtdb.europe-west1.firebasedatabase.app/damages.json', {
        method: 'POST',
        body: JSON.stringify(tmpData),
        headers: { 'Content-type': 'application/json' }
    });
    const data = await response.json();
    navigate("/");
}

    return (
        <div>
            <h1>Zgłoś usterkę</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="reserveID"><strong>Numer rezerwacji</strong></label>
                <input id="reserveID" type="text" placeholder="Enter reservation number" name="reserveID" ref={reserveIDRef} required />
                <label htmlFor="damage-msg">Your message</label>
                <textarea className="damage-msg" placeholder="Write your message" rows="10" ref={damageRef} required></textarea>
                <button>Wyślij</button>
            </form>
        </div>
    );
}

export default DamagesPage;