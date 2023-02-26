// Express.js
const express = require('express');
const app = express();

// Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






app.listen(9090, () => { 
    console.log('Server is running on port 9090');
});