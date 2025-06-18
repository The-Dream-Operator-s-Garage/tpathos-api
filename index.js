const express = require('express');
const middleware = require('./middleware/jwt-middleware');

const app = express();
const port = process.env.PORT || 3000;

const api = require('./routes/api');
const login = require('./routes/login');
const pub = require('./routes/pub');

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ROUTES
app.use('/api/tpathos-v0', middleware, api); // API middleware protected endpoints
app.use('/api/login', login);
app.use('/api/pub', pub);

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log('El servidor inicio en el puerto ' + port);
});
