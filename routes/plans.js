'use strict';

const express = require('express');
const router = express.Router();
const plansModel = require('../models/plansModel');



router.get('/', async (req, res) => {
    const plansData = await plansModel.getAllPlans();
        res.json(plansData).status(200);
});

router.post('/', async (req, res) => {
    const { day, activity } = req.body;
    
    const responseDayActivity = await plansModel.addDayActivity(day, activity);
    console.log('post data response is', responseDayActivity);
    if(responseDayActivity.rowCount >= 1) {
        res.redirect('/plans')
    }
    else {
        res.sendStatus(500);
    }
});


module.exports = router;