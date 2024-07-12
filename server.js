const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let notes = [];

// navegacion
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// apis
app.get('/notas', (req, res) => {
  res.json(notes);
});

app.get('/notas/:id', (req, res) => {
  const note = notes.find(note => note.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send('Nota no encontrada');
  }
});

app.post('/notas', (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || title.trim() === '' || !content || content.trim() === '') {
    return res.status(400).send('El título y el contenido son obligatorios');
  }

  const newNote = {
    id: uuidv4(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : []
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/notas/:id', (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || title.trim() === '' || !content || content.trim() === '') {
    return res.status(400).send('El título y el contenido son obligatorios');
  }

  const note = notes.find(note => note.id === req.params.id);
  if (note) {
    note.title = title.trim();
    note.content = content.trim();
    note.updatedAt = new Date();
    note.tags = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];
    res.json(note);
  } else {
    res.status(404).send('Nota no encontrada');
  }
});

app.delete('/notas/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id);
  res.status(204).send();
});

//iniciar server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
