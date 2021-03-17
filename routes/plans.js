'use strict';

const express = require('express');
const router = express.Router();
const plansModel = require('../models/plansModel');
const slugify = require('slugify');


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

    const responseLocation = await plansModel.addLocation(slug, location);
    console.log('post data response is', responseLocation);
    if(responseLocation.rowCount >= 1) {
        res.redirect('/plans')
    }
    else {
        res.sendStatus(500);
    }
    
    const responseDayActivity = await plansModel.addDayActivity(day, activity);
    console.log('post data response is', responseDayActivity);
    if(responseDayActivity.rowCount >= 1) {
        res.redirect('/plans')
    }
    else {
        res.sendStatus(500);
    }
});

router.post('/delete', async (req, res) => {
    const { location_id } = req.body;

    const plan = new plansModel(location_id);
    const response = await plan.deleteEntry();
    console.log('Delete response is', response);
    if(response.rowCount >= 1) {
        res.redirect('/plans');
    }
    else {
        res.sendStatus(500);
    }
});


module.exports = router;