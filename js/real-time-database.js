var lista = document.getElementById("lista-usuarios");
var nome = document.getElementById("nome");
var idade = document.getElementById("idade");
var botao = document.getElementById("addButton");


/* Ao clicar no botão */
botao.addEventListener('click', function() {
    create(nome.value, idade.value);
});


function create(nome, idade) {
    var data = {
        nome: nome,
        idade: idade
    }

    return firebase.database().ref().child('usuarios').push(data);
}

/* Quando houver qualquer alteração no firebase */
firebase.database().ref('usuarios').on('value', function(snapshot) {
    lista.innerHTML = '';
    snapshot.forEach(function(item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().nome + ' : ' + item.val().idade));
        lista.appendChild(li);
    })
});