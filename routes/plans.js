'use strict';

const express = require('express');
const router = express.Router();
const plansModel = require('../models/plansModel');


router.get('/', async (req, res) => {
    const plansData = await plansModel.getAll();

    res.json(plansData).status(200);
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const location = await plansModel.getBySlug(slug);

    if(location) {
        res.json(location).status(200);
    }
    else {
        res.status(404).send(`no location found that matches slug, ${slug}`);
    }
});

router.post('/', async (req, res) => {
    const { location, day, activity } = req.body;
    const slug = slugify(location, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const response = await plansModel.addEntry(slug, location, day, activity);
    console.log('post data response is', response);
});


module.exports = router;