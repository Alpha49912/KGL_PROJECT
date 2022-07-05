const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
//require Mananger database to save new user 
const Manager = require('../models/Manager');

router.get('/', (req, res) => {
    res.render('login', {title: 'User Login'})
});

//Request the server to authenticate user to login, and respond with dashboard
router.post('/', passport.authenticate('local', {failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user
        //go when loggedin
        res.redirect('/procurement')
    }
)
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})
module.exports = router;