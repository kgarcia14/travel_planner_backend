'use strict';

const db = require('./conn');

class plansModel {
    constructor(id, slug, location, day, activity) {
        this.id = id;
        this.slug = slug;
        this.location = location;
        this.day = day;
        this.activity = activity;
    }

    static async getAll() {
        const response = await db.any(`SELECT * FROM plans;`);
        return response;
    }

    static async getBySlug(slug) {
        const response = await db.one(`SELECT * FROM plans WHERE slug = '${slug}';`)
        return response;
    }

    static async addLocation(slug, location) {
        const response = await db.result(`INSERT INTO plans (slug, location) 
        VALUES ($1, $2)`, 
        [slug, location]);
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