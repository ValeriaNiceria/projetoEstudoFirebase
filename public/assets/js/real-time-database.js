var list = document.getElementById("userlist");
var nome = document.getElementById("nome");
var idade = document.getElementById("idade");
var addButton = document.getElementById("addButton");

/* Ao clicar no botão */
addButton.addEventListener('click', function() {
	create(nome.value, idade.value);
});


function create(nome, idade) {

	var data = {
		nome: nome,
		idade: idade
	}

	return firebase.database().ref().child('usuarios').push(data);
}


firebase.database().ref('usuarios').on('value', function(snapshot) {
	list.innerHTML = '';
	snapshot.forEach(function(item) {
		var li = document.createElement('li');
		li.appendChild(document.createTextNode(item.val().nome + ': ' + item.val().idade));
		list.appendChild(li);
	});
});




