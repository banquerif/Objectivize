const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    // Implementar express-validator
    if(name === "" || email === "" || password === "" || confirm_password === "") {
        errors.push('Please insert all form field')
    }
    if(password !== confirm_password) {
        errors.push('Password do not match');
    }
    if(password.length < 4 ) {
        errors.push('Password must be at least 4 characters')
    }
    if(confirm_password.length < 4 ) {
        errors.push('Confirm password must be at least 4 characters')
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {
        /* 
        const emailUser = await User.findOne({email: email});
        if(emailUser !== "") {
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signin');
        }
        */
        
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});

module.exports = router;
