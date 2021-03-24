'use strict';

const db = require('./conn');

class locationsModel {
    constructor(id, slug, location) {
        this.id = id;
        this.slug = slug;
        this.location = location;
    }

    static async getAllLocations() {
        const response = await db.any(`SELECT * FROM locations;`);
        return response;
    }

    static async getBySlug(slug) {
        const response = await db.one(`SELECT * FROM locations WHERE slug = '${slug}';`)
        return response;
    }

    static async addLocation(slug, location) {
        const response = await db.result(`INSERT INTO locations (slug, location) 
        VALUES ($1, $2)`, 
        [slug, location]);
        return response;
    }
    
}

module.exports = locationsModel;