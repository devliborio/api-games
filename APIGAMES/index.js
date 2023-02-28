// Express.js
const express = require('express');
const app = express();

// Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Banco de dados falso
let DB = {
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

        let id = parseInt(req.params.id);

        let games = DB.games.find(g => g.id == id);

        if (games != undefined) {
            res.statusCode = 200;
            res.json(games);
        } else {
            res.sendStatus(404);
        }

    }

});

app.post("/game", (req, res) => {

    let { title, price, year } = req.body; // Usando desestruturação

    if (title == undefined || price == undefined || year == undefined) {
        res.sendStatus(400);
        return;
    }

    price = Number(price);
    year = Number(year);

    if (!price || !year) {
        res.sendStatus(400);
        return;
    }

    DB.games.push({

        id: DB.games.length + 1,
        title,
        price,
        year

    });

    res.sendStatus(201);
});

app.put("/game/:id", (req, res) => {

    let id = Number(req.params.id);
    let games = DB.games.find(g => g.id == id);
    let { title, price, year } = req.body;

    if (isNaN(req.params.id)) {
        res.sendStatus(400); // Enviando statusCode para notificar erro de sintaxe incorreta.
        return;
    }

    if (title == undefined && price == undefined && year == undefined) {
        res.sendStatus(400)
    } else {

        games.title = title;
        games.price = price;
        games.year = year;

        res.sendStatus(201);
    }
    
});

app.delete("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400); // Enviando statusCode para notificar erro de sintaxe incorreta.

    } else {

        let id = parseInt(req.params.id);
        let index = DB.games.findIndex(g => g.id == id);

        if (index == -1) { // Esse elemento que você está tentando deletar não existe.
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }

});

app.listen(9090, (err) => {

    if (!err) {
        console.log('API RUNNING!');
    } else {
        err.sendStatus(500);
    }

});


