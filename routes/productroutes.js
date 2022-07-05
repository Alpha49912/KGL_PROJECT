const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//require Mananger database to save new user 
const Product = require('../models/Product');
router.get('/', (req, res) => {
        res.render('productsell');
});


router.post('/', async (req, res) => {
    try {
        let product = new Product(req.body);
        await product.save();
        res.redirect('/products/list')
        console.log(req.body);
    }
    catch (err) {
        res.status(400).render('/list', { title: "Products ", routeName: 'Products' })
    }

});

router.get('/list', async (req, res) => {
    try {
        let productdetails = await Product.find();
        res.render('list', { products: productdetails, title: 'Product Sell' })
    }
    catch (err) {
        console.log(err)
        res.send('Failed to retrieve manager details')
    }
});

//Get data to edit from database
router.get('/edit/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        res.render('edit_product', {
            title: '',
            product: product
        });
    });
});

//Delete product
router.post('/delete', async (req, res) => {
    try {
        await Manager.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(400).send("Unable to delete item in the database");
    }

});
//Edit product
router.post('/edit/:id', (req, res) => {
    let product = {};
    product.name = req.body.name;
    product.price = req.body.price;
    product.qty = req.body.price

    let querry = { _id: req.params.id };
    Product.update(querry, product, (err) => {
        if (err) {
            console.error(err);
            return;

        } else {
            req.flash('success', 'Product Updated');
            res.redirect('/list');
        };
    });
});

module.exports = router;