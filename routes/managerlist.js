const express = require('express');
const Manager = require('../models/Manager');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let managerdetails = await Manager.find();
        res.render('productsell', { users: managerdetails, title: 'Product Sell' })
    }
    catch (err) {
        console.log(err)
        res.send('Failed to retrieve manager details')
    }
});
router.post('/delete', async (req, res) => {
    try {
        await Manager.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }

});

//delete manager


module.exports = router;