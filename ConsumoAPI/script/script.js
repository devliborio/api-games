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

axios.get("http://localhost:9090/games").then((response) => {

    let games = response.data;
    let list = document.getElementById("games");

    games.forEach((game) => {

        let item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = game.id + " - " + game.title + " - R$ " + game.price;
        list.appendChild(item);

    });

}).catch((error) => {
    console.log(error);
})
