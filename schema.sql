CREATE TABLE locations (
    id serial PRIMARY KEY,
    slug text,
    location text
);

CREATE TABLE plans (
    id serial PRIMARY KEY,
    day text NOT NULL,
    activity text NOT NULL,
    location_id integer REFERENCES locations (id)
);