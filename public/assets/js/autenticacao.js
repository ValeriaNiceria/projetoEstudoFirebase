/*display*/
var displayMessage = document.getElementById("displayMessage");
/*inputs*/
var email = document.getElementById("email");
var senha = document.getElementById("senha");
/*buttons*/
var loginButton = document.getElementById("loginButton");
var createUserButton = document.getElementById("createUserButton");
var logOutButton = document.getElementById("logOutButton");
var autAnnonymous = document.getElementById("autAnnonymous");
var autGitHub = document.getElementById("autGitHub");

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


/* autenticar com e-mail e senha */
loginButton.addEventListener('click', function() {
	firebase
		.auth()
		.signInWithEmailAndPassword(email.value, senha.value)
		.then(function(result) {
			console.log(result);
			displayMessage.innerText = 'Bem vindo, ' +email.value;
			alert('Autenticado ' + email.value);
			email.value = null;
			senha.value = null;
		})
		.catch(function(error) {
			console.error(error.code);
			console.error(error.message);
			alert('Falha ao autenticar, verifique o erro no console.');
		})
});


/* Logout */
logOutButton.addEventListener('click', function() {
	firebase
		.auth()
		.signOut()
		.then(function() {
			displayMessage.innerText = 'Você não está autenticado';
			alert('Você se deslogou');
		}, function(error) {
			console.error(error);
		});
});


/* Autenticar anônimo */
autAnnonymous.addEventListener('click', function() {
	firebase
		.auth()
		.signInAnonymously()
		.then(function(result) {
			console.log(result);
			displayMessage.innerText = 'Bem vindo, desconhecido';
			alert('Autenticado Anonimamente');
		})
		.catch(function(error) {
			console.error(error.code);
			console.error(error.message);
			alert('Falha ao autenticar, verifique o erro no console');
		});
});


/* Autenticar com GitHub */
autGitHub.addEventListener('click', function() {
	/* Providers */
	var provider = new firebase.auth.GithubAuthProvider();
	signIn(provider);
});

function signIn(provider) {
	firebase.auth()
		.signInWithPopup(provider)
		.then(function(result) {
			console.log(result);
			var token = result.credential.accessToken;
			displayMessage.innerText = 'Bem vindo(a), ' + result.user.displayName;
		})
		.catch(function(error) {
			console.log(error);
			alert('Falha na autenticação');
		});
}