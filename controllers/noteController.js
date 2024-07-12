const fs = require('fs');
const path = require('path');
const Note = require('../models/note');

const dataFilePath = path.join(__dirname, '../data.json');

// Helper functions to read and write data
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.getAllNotes = (req, res) => {
    const notes = readData();
    res.json(notes);
};

exports.getNoteById = (req, res) => {
    const notes = readData();
    const note = notes.find(n => n.id === req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

exports.createNote = (req, res) => {
    const { title, content, tags } = req.body;
    const newNote = new Note(title, content, tags);
    const notes = readData();
    notes.push(newNote);
    writeData(notes);
    res.status(201).json(newNote);
};

exports.updateNote = (req, res) => {
    const notes = readData();
    const note = notes.find(n => n.id === req.params.id);
    if (note) {
        const { title, content, tags } = req.body;
        note.update(title, content, tags);
        writeData(notes);
        res.json(note);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
};

exports.deleteNote = (req, res) => {
    let notes = readData();
    notes = notes.filter(n => n.id !== req.params.id);
    writeData(notes);
    res.status(204).end();
};
