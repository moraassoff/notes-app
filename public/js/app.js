const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(noteRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});

module.exports = app;
