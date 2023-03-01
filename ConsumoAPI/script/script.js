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

        item.classList.add("list-group-item");
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-price", game.price);
        item.setAttribute("data-year", game.year);

        item.innerHTML = game.id + " - " + game.title + " - R$ " + game.price;

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Deletar";
        deleteButton.addEventListener("click", function () {
            deleteGame(item);
        });
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ml-3");

        item.appendChild(deleteButton);

        list.appendChild(item);

    });

}).catch((error) => {
    console.log(error);
})
