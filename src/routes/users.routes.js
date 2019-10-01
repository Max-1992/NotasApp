const { Router } = require('express');
const router = Router();

//Importaciones
const User = require('../models/users.model');
const passport = require('passport');


// Ingreso/Login
router.get('/users/signin', (req, res, next) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


// Registro/SignUp
router.get('/users/signup', (req, res, next) => {
    res.render('users/signup')
});

router.post('/users/signup', async(req, res, next) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    // VALIDACIONES

    if (name.length <= 0) {
        errors.push({ message: 'Please insert yout name' })
    }

    if (email.length <= 0) {
        errors.push({ message: 'Please insert yout email' })
    }

    if (password.length <= 0) {
        errors.push({ message: 'Password is required' })
    }


    if (password != confirm_password) {
        errors.push({ message: 'Password do not match' })
    }

    if (password.length < 4) {
        errors.push({ message: 'Password must be at least 4 characters' })
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {

        //Validación de Usuario Existente
        try {
            const emailUser = await User.findOne({ email: email });
            if (emailUser) {
                req.flash('error_msg', 'The Email is already in use')
                res.redirect('/users/signup');
            }
        } catch (error) {
            console.error(error)
        }

        // Generando y guardando Usuario den la DB
        try {
            const user = new User({
                name,
                email,
                password
            });

            user.password = await user.encryptPassword(password);

            await user.save();
            res.redirect('/users/signin')
        } catch (error) {
            console.error(error)
        }


    }
});

router.get('/users/logout', (req, res) => {
    req.logout()
    res.redirect('/');
})


module.exports = router;