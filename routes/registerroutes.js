const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//require Mananger database to save new user 
const Manager = require('../models/Manager');

router.get('/', (req, res) => {
    res.render('farmanager_register')
});

router.post('/', async (req, res) => {
    const manager = new Manager(req.body);
    await Manager.register(manager, req.body.password, (err) => {
        if (err) {
            //if there errors, remain on login/register page
            res.status(404).render('farmanager_register', {
                title: ''
            });
           console.log(err)
        } else {
            res.redirect('/farmanager_register');
        }
    })
     
});
module.exports = router;