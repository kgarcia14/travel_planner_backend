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

    static async addDayActivity(day, activity, slug) {
        const response = await db.result(`INSERT INTO plans (day, activity, slug)
        VALUES ($1, $2, $3)`,
        [day, activity, slug]);
        return response;
    }

    static async getAllBySlug(slug) {
        const response = await db.any(`SELECT plans.day, plans.activity, plans.id
        FROM plans JOIN locations
        ON plans.slug = locations.slug
        WHERE plans.slug='${slug}';`);
        return response;
    }

    async deleteEntry() {
        const response = await db.result(`DELETE from plans WHERE id=$1;`, [this.id]);
        return response;
    }
}

module.exports = plansModel;
