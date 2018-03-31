/*display*/
var displayMessage = document.getElementById("displayMessage");
/*inputs*/
var email = document.getElementById("email");
var senha = document.getElementById("senha");
/*buttons*/
var loginButton = document.getElementById("loginButton");
var createUserButton = document.getElementById("createUserButton");

/*criar novo usuário*/
createUserButton.addEventListener('click', function() {
	firebase
		.auth()
		.createUserWithEmailAndPassword(email.value, senha.value)
		.then(function() {
			alert('Bem vindo(a) ' + email.value);
			email.value = null;
			senha.value = null;
		})
		.catch(function(error) {
			console.log(error.code);
			console.log(error.message);
			alert('Falha ao cadastrar, verifique o erro no console.');
		});
});







