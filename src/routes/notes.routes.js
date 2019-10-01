const { Router } = require('express');
const router = Router();

// Require Schema de Data
const Note = require('../models/notes.model');

// Require Helpers
const { isAuthenticated } = require('../helpers/auth')


// Routes

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes')
});

router.get('/notes/new-note', isAuthenticated, (req, res) => {
    res.render('notes/new-notes')
});

// Grabar datos en Nuestra DB
router.post('/notes/new-note', isAuthenticated, async(req, res) => {

    const { title, description } = req.body;

    // Validations
    const errors = [];

    if (!title) {
        errors.push({ message: 'Please Write a Text' });
    }

    if (!description) {
        errors.push({ message: 'Please Write a Description' });
    }

    if (errors.length > 0) {
        res.render('notes/new-notes', {
            errors,
            title,
            description
        })
    } else {

        // Almacernar datos en DB
        const newNote = new Note({
            title,
            description
        });
        newNote.user = req.user.id;
        try {
            await newNote.save();
            req.flash('success_msg', 'La nota fue agregada correctamente')
            res.redirect('/notes')
        } catch (error) {
            console.error(error);
        }

    }

});

// Leer datos en Nuestra DB
router.get('/notes', isAuthenticated, async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' })
    res.render('notes/all-notes', {
        notes
    })
});


// Editer datos de nuestra DB

router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {

    let { id } = req.params;

    try {
        const note = await Note.findById(id);
        res.render('notes/edit-notes', {
            note
        })
    } catch (error) {
        console.error(error);
    }

});

router.put('/notes/edit/:id', isAuthenticated, async(req, res) => {

    let { id } = req.params.id;
    let { title, description } = req.body;

    try {
        await Note.findOneAndUpdate(id, { title, description });
        req.flash('update_msg', 'La nota fue actualizada correctamente')
        res.redirect('/notes')
    } catch (error) {
        console.error(error)
    }

})

// Eliminar datos de nuestra DB

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {

    let { id } = req.params.id;

    try {
        await Note.findOneAndDelete(id);
        req.flash('delete_msg', 'La nota fue eliminada correctamente')
        res.redirect('/notes')
    } catch (error) {
        console.error(error)
    }

})

module.exports = router;