let axiosConfig = { // Definindo variável que vai armazenar o Token de autenticação para que nossa pagina HTML possa consumir a API rest de games.

    headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsaWJvcmlvLm9mY0BnbWFpbC5jb20iLCJpYXQiOjE2Nzc3ODg4NjQsImV4cCI6MTY3Nzk2MTY2NH0.qnpmSC8a1DYne3R0KGvdY_A0fQ3ADOXbk6wassj3FO4"
    }
}

function createGame() { // Aqui basicamente criamos uma função que é responsável por criar um novo game na dentro array de games da nossa API.
    let titleInput = document.getElementById("title"); // Basicamente definimos essa variável para pegar o ID do input do titulo do game.
    let priceInput = document.getElementById("price"); // Basicamente definimos essa variável para pegar o ID do input do preço do game.
    let yearInput = document.getElementById("year"); // Basicamente definimos essa variável para pegar o ID do input do ano de lançamento do game.

    let game = { // JSON que armazena os dados vindo do formulário frontend para criar um novo game, armazena os dados de titulo, preço e ano de lançamento e envia com axios para a rota de post() de criação de games.
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value
    }

    axios.post("http://localhost:9090/game", game, axiosConfig).then((response) => { // Enviando via axios os dados armazenados na variável game

        if (response.status == 201) { // Aqui fazemos uma verificação caso o statusCode seja 201 (criado!) enviamos um alert na tela do usuário dizendo que o game foi cadastrado!
            alert("Game cadastrado!")
        }

    }).catch((erro) => { // Caso ocorra um error durante o envio dos dados para a rota de criação de games, ele retorna um erro no console e um alert de erro na tela do usuário.
        console.log(erro);
        alert("Error durante o cadastro!");
    })
}


function loadForm(listItem) { // Função que carrega os itens do game que vai ser editado no formulário de edição do HTML.

    // Nessas variáveis pegamos todos os atributos da <li>
    let id = listItem.getAttribute("data-id");
    let title = listItem.getAttribute("data-title");
    let year = listItem.getAttribute("data-year");
    let price = listItem.getAttribute("data-price");

    // Aqui usamos o DOM para pegar os inputs do formulário de edição e carregar dentro deles os valores do game escolhido.
    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
}

function updateGame() { // Função que edita os campos de titulo, preço e ano de lançamento do game.

    let idInput = document.getElementById("idEdit") // Aqui usamos o DOM para trazer o input de ID para o JS.
    let id = idInput.value // E armazenamos o valor do ID nessa variável.
    // Essas 3 variáveis abaixo só usamos para trazer os inputs do HTML para o JS.
    let titleInput = document.getElementById("titleEdit"); 
    let priceInput = document.getElementById("priceEdit");
    let yearInput = document.getElementById("yearEdit");

    let game = { // A partir dessa variável nos armazenamos os dados que estão dentro dos inputs do HTML dentro desse json, para que ele seja enviado para o endpoint put() de edição de game.
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value
    }

    axios.put("http://localhost:9090/game/" + id, game, axiosConfig).then((response) => { // Usamos o axios, para enviar o ID do game que queremos editar, e os dados que vão ser editados.

        if (response.status == 201) { // Caso ocorra tudo certo e o statusCode seja igual a 201 (Criado!) enviamos um alert para o usuário.
            alert("Game Editado!")
        }

    }).catch((erro) => { // Caso ocorra algum erro, enviamos um erro no console, juntamente com um alerta de erro.
        console.log(erro);
        alert("Erro no processo de edição de game!")
    })

}

function deleteGame(listItem) { // Função de deleção de game, essa função recebe como parâmetro uma variável chamada listItem que basicamente é o game.
    let id = listItem.getAttribute("data-id"); // Criamos uma variável para armazenar o ID que buscamos através do método getAttribute().
    axios.delete("http://localhost:9090/game/" + id, axiosConfig).then((response) => { // Aqui nos usamos o axios para enviar o ID buscamos na variável acima para a rota de deleção da API.

        alert("Game deletado!"); //  Caso a exclusão dê certo nos usamos enviamos um alerta para o usuário notificando que o game foi deletado!

    }).catch((err) => { // Caso ocorra algum erro no processo de deleção, nos enviamos um erro no console, juntamente com um alert de erro!
        console.log(err);
        alert("Erro no processo de deleção");
    });
}

axios.get("http://localhost:9090/games",axiosConfig).then((response) => { // Usando o axios para consumir a rota de listagem de games, usando promise.

    let games = response.data; // Aqui pegamos os dados dos games lá da API, o JSON no caso (ID ,titulo, preço e ano de lançamento)
    let list = document.getElementById("games"); // Aqui estamos usando DOM para pegar a <ul> do HTML.

    games.forEach((game) => { // Aqui fazemos um LOOP nos dados do JSON.

        let item = document.createElement("li"); // Criamos um dinamicamente uma tag <li>
        item.innerHTML = game.id + " - " + game.title + " - R$ " + game.price; // E dentro de cada <li> colocamos separadamente o ID do game, o titulo do game e o preço.

        item.classList.add("list-group-item"); // Aqui adicionamos uma tag do bootstrap para organizar as <li> dentro da li de forma mais bonita.
        item.setAttribute("data-id", game.id); // Aqui adicionamos um atributo data-id="game.id" com o ID do game.
        item.setAttribute("data-title", game.title); // Aqui adicionamos um atributo data-title="game.title" com o titulo do game.
        item.setAttribute("data-price", game.price); // Aqui adicionamos um atributo data-price="game.price" com o preço do game.
        item.setAttribute("data-year", game.year); // Aqui adicionamos um atributo data-year="game.year" com o ano de lançamento do game.


        let deleteButton = document.createElement("button"); // Aqui nos criamos um botão dinamicamente ao lado da <li>.
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ml-3"); // Aqui definimos algumas classes do bootstrap para deixar o botão mais organizado e bonito.
        deleteButton.innerHTML = "Deletar"; // Escrevemos dinamicamente no corpo do botão a palavra "Deletar".
        deleteButton.addEventListener("click", function () { // Aqui definimos um evento de click no botão, então todas vez que ele é clicado a função deleteGame() é chamada e executada. 
            deleteGame(item);
        });


        let editButton = document.createElement("button"); // Aqui criamos outro botão dinamicamente  ao lado da <li>
        editButton.classList.add("btn", "btn-warning", "btn-sm", "ml-1"); // Aqui definimos algumas classes do bootstrap para deixar o botão mais organizado e bonito.
        editButton.innerHTML = "Editar"; // Escrevemos dinamicamente no corpo do botão a palavra "Editar".
        editButton.addEventListener("click", function () { // Aqui definimos um evento de click no botão, então toda vez que ele é clicado a função loadForm() é chamada e executada.
            loadForm(item);
        });


        item.appendChild(deleteButton); // Aqui nos adicionamos dinamicamente o botão de deletar ao lado da <li>.
        item.appendChild(editButton); // Aqui nos adicionamos dinamicamente o botão de editar ao lado da <li>.
        list.appendChild(item); // Aqui nos acrescentamos as <li> criadas dinamicamente dentro da <ul>.

    });

}).catch((error) => {
    console.log(error);
});
