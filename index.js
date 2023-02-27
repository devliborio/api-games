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
            id: 21,
            title: 'Bayonetta ',
            year: 2009,
            price: 36
        },

        {
            id: 32,
            title: 'Subnautica',
            year: 2014,
            price: 57
        },

        {
            id: 45,
            title: 'Hogwarts Legacy',
            year: 2023,
            price: 250
        },

    ]
}

// EndPoints
app.get("", () => {
    
});

app.listen(9090, (err) => { 

    if(!err) {
        console.log('Server is running on port 9090');
    } else {
        console.log(err);
    }
    
});