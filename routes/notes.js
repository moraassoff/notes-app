const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/notas', noteController.getAllNotes);
router.get('/notas/:id', noteController.getNoteById);
router.post('/notas', noteController.createNote);
router.put('/notas/:id', noteController.updateNote);
router.delete('/notas/:id', noteController.deleteNote);

module.exports = router;
