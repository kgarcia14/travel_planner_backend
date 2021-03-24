'use strict';

const express = require('express');
const router = express.Router();
const locationsModel = require('../models/locationsModel');
const slugify = require('slugify');

router.get('/', async (req, res) => {
    const LocationsData = await locationsModel.getAllLocations();
    res.json(LocationsData).status(200);
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const location = await locationsModel.getBySlug(slug);

    if(location) {
        res.json(location).status(200);
    }
    else {
        res.status(404).send(`no location found that matches slug, ${slug}`);
    }
});

router.post('/', async (req, res) => {
    const { location } = req.body;
    const slug = slugify(location, {
        replacement: '_',
        lower: true,
        strict: true
    });

    const responseLocation = await locationsModel.addLocation(slug, location);
    console.log('post data response is', responseLocation);
    if(responseLocation.rowCount >= 1) {
        res.redirect('/locations')
    }
    else {
        res.sendStatus(500);
    }
});

module.exports = router;
