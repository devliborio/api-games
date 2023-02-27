// Express.js
const express = require('express');
const app = express();

// Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Banco de dados falso
var DB = {
    games: [

        {
            id: 1,
            title: 'Bayonetta ',
            year: 2009,
            price: 36
        },

        {
            id: 2,
            title: 'Subnautica',
            year: 2014,
            price: 57
        },

        {
            id: 3,
            title: 'Hogwarts Legacy',
            year: 2023,
            price: 250
        },

    ]
}

// EndPoints
app.get("/games", (req, res) => {

    res.statusCode = 200; // Requisição foi feita com sucesso!
    res.json(DB.games)

})

app.get("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400); // Enviando statusCode para notificar erro de sintaxe incorreta.
    } else {

        var id = parseInt(req.params.id);

        var games = DB.games.find(g => g.id == id);

        if (games != undefined) {
            res.statusCode = 200;
            res.json(games);
        } else {
            res.sendStatus(404);
        }

    }

});

app.post("/game", (req, res) => {

    var { title, price, year } = req.body; // Usando desestruturação

    if (title == undefined || isNaN(price) || isNaN(year)) {
        res.sendStatus(400); // Enviando statusCode para notificar erro de sintaxe incorreta.
    } else {
        DB.games.push({
            id: DB.games.length + 1,
            title: title,
            year: year,
            price: price

        });
        res.sendStatus(201);
    }
});

app.listen(9090, (err) => {

    if (!err) {
        console.log('API RUNNING!');
    } else {
        err.sendStatus(500);
    }

});


