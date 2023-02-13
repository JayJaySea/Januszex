const register = document.getElementById("register");

register.addEventListener("click", function() {
	fetch('/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{ 
				name: 'janusz',
				surname: 'januszewski',
				login: "usze",
				email: "janusz@gmail.com",
				password: "xd",
				drivingLicense: "B",
				role: 1
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const login = document.getElementById("login");

login.addEventListener("click", function() {
	fetch('/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{ 
				login: "usze",
				password: "xd"
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const profile = document.getElementById("profile");

profile.addEventListener("click", function() {
	fetch('/profile', {
		method: 'GET',
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const logout = document.getElementById("logout");

logout.addEventListener("click", function() {
	fetch('/logout', {
		method: 'GET',
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const list = document.getElementById("list");

list.addEventListener("click", function() {
	fetch('/list_cars', {
		method: 'GET',
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const reserve = document.getElementById("reserve");

reserve.addEventListener("click", function() {
	fetch('/reserve', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{
				rentDate: "2004-02-12T00:00:00",
				returnDate: "2004-02-12T00:00:00",
				deliveryAddress: "abcd",
				carID: 3
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const cancel_res = document.getElementById("cancel_res");

cancel_res.addEventListener("click", function() {
	fetch('/cancel_reservation', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{
				id: 1
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const reserve_guest = document.getElementById("reserve_guest");

reserve_guest.addEventListener("click", function() {
	fetch('/reserve', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{
				user: { 
					name: 'janusz',
					surname: 'januszewski',
					email: "janusz@gmail.com",
					drivingLicense: "B",
					role: 1
				},
				reserve: {
					rentDate: "2004-02-12T00:00:00",
					returnDate: "2004-02-12T00:00:00",
					deliveryAddress: "abcd",
					carID: 6
				}
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const report_damage = document.getElementById("report_damage");

report_damage.addEventListener("click", function() {
	fetch('/report_damage', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{
				description: "jakaś usterka"
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const give_feedback = document.getElementById("give_feedback");

give_feedback.addEventListener("click", function() {
	fetch('/give_feedback', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(
			{
				description: "jakaś uwaga"
			})
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});

const delete_account = document.getElementById("delete_account");

delete_account.addEventListener("click", function() {
	fetch('/delete_account', {
		method: 'DELETE',
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});


const reservation_history = document.getElementById("reservation_history");

reservation_history.addEventListener("click", function() {
	fetch('/reservation_history', {
		method: 'GET',
})	
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error(error));
});
