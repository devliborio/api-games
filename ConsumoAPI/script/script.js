function createGame() {
    let titleInput = document.getElementById("title");
    let priceInput = document.getElementById("price");
    let yearInput = document.getElementById("year");

    let game = {
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value
    }
    axios.post("http://localhost:9090/game", game).then((response) => {

        if (response.status == 201) {
            alert("Game cadastrado!")
        }

    }).catch((erro) => {
        console.log(erro);

    })
}


function loadForm(listItem) {

    let id = listItem.getAttribute("data-id");
    let title = listItem.getAttribute("data-title");
    let year = listItem.getAttribute("data-year");
    let price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
}

function updateGame() {

    let idInput = document.getElementById("idEdit")
    let id = idInput.value
    let titleInput = document.getElementById("titleEdit");
    let priceInput = document.getElementById("priceEdit");
    let yearInput = document.getElementById("yearEdit");

    let game = {
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value
    }
    axios.put("http://localhost:9090/game/" + id, game).then((response) => {

        if (response.status == 201) {
            alert("Game Editado!")
        }

    }).catch((erro) => {
        console.log(erro);

    })

}

function deleteGame(listItem) {
    let id = listItem.getAttribute("data-id");
    axios.delete("http://localhost:9090/game/" + id).then((response) => {

        alert("Game deletado!");

    }).catch((err) => {
        console.log(err);
    });
}

axios.get("http://localhost:9090/games").then((response) => {

    let games = response.data;
    let list = document.getElementById("games");

    games.forEach((game) => {

        let item = document.createElement("li");
        item.innerHTML = game.id + " - " + game.title + " - R$ " + game.price;

        item.classList.add("list-group-item");
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-price", game.price);
        item.setAttribute("data-year", game.year);


        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ml-3");
        deleteButton.innerHTML = "Deletar";
        deleteButton.addEventListener("click", function () {
            deleteGame(item);
        });


        let editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning", "btn-sm", "ml-1");
        editButton.innerHTML = "Editar";
        editButton.addEventListener("click", function () {
            loadForm(item);
        });


        item.appendChild(deleteButton);
        item.appendChild(editButton);
        list.appendChild(item);

    });

}).catch((error) => {
    console.log(error);
})
