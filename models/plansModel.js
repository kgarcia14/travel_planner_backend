'use strict';

const db = require('./conn');

class plansModel {
    constructor(id, day, activity) {
        this.id = id;
        this.day = day;
        this.activity = activity;
    }

    static async getAllPlans() {
        const response = await db.any(`SELECT * FROM plans;`);
        return response;
    }

    static async addDayActivity(day, activity) {
        const response = await db.result(`INSERT INTO plans (day, activity)
        VALUES ($1, $2)`,
        [day, activity]);
        return response;
    }
}

module.exports = plansModel;