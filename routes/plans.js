'use strict';

const express = require('express');
const router = express.Router();
const plansModel = require('../models/plansModel');
const locationsModel = require('../models/locationsModel');


router.get('/', async (req, res) => {
    const plansData = await plansModel.getAllPlans();
        res.json(plansData).status(200);
});

router.get('/:slug', async (req, res) => {
    const {slug} = req.params;
    const location = await locationsModel.getBySlug(slug);
    const plansData = await plansModel.getAllBySlug(location.slug);
        res.json(plansData).status(200);
});

router.post('/', async (req, res) => {
    const { day, activity, slug } = req.body;
    
    const responseDayActivity = await plansModel.addDayActivity(day, activity, slug);
    console.log('post data response is', responseDayActivity);
    if(responseDayActivity.rowCount >= 1) {
        res.redirect('/plans')
    }
    else {
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const plan = new plansModel(id);
    const response = await plan.deleteEntry();
    console.log('Delete response is:', response);
    if(response.rowCount >= 1) {
        res.redirect('/plans')
    }
    else {
        res.sendStatus(500);
    }
});


module.exports = router;