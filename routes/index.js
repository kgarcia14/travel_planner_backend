'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('This is my Travel Planner').status(200);
});

module.exports = router;