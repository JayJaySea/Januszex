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
