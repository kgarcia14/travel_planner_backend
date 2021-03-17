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

    static async addEntry(slug, location, day, activity) {
        const response = await db.result(`INSERT INTO plans (slug, location, day, activity) 
        VALUES ($1, $2, $3, $4)`, 
        [slug, location, day, activity]);
        return response;
    }
}

module.exports = plansModel;