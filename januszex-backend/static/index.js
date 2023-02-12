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
				rentDate: "2004-02-12T15:19:21",
				returnDate: "2004-02-12T15:19:21",
				deliveryAddress: "abcd",
				carID: 6
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
					rentDate: "2004-02-12T15:19:21",
					returnDate: "2004-02-12T15:19:21",
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
