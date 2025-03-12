const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Visualizzare la lista delle attività
router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/');

    // Trova l'utente nel database e prendi le sue attività
    const user = await User.findById(req.user._id);
    res.render('todo', { user: user, tasks: user.tasks });
});

// Aggiungere una nuova attività
router.post('/add', async (req, res) => {
    if (!req.user) return res.redirect('/');

    const user = await User.findById(req.user._id);
    user.tasks.push({ text: req.body.task, done: false });
    await user.save();  // Salva le modifiche nel database
    res.redirect('/todo');  // Ricarica la pagina della To-Do List
});

// Completare un'attività
router.post('/complete', async (req, res) => {
    if (!req.user) return res.redirect('/');

    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.body.taskId);  // Trova l'attività tramite ID
    task.done = true;  // Imposta il campo 'done' a true
    await user.save();  // Salva le modifiche
    res.redirect('/todo');  // Ricarica la pagina
});

// Eliminare un'attività
router.post('/delete', async (req, res) => {
    if (!req.user) return res.redirect('/');

    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.body.taskId);  // Trova l'attività tramite ID
    task.remove();  // Rimuovi l'attività
    await user.save();  // Salva le modifiche nel database
    res.redirect('/todo');  // Ricarica la pagina
});

module.exports = router;

