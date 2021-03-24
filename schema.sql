CREATE TABLE locations (
    id serial PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    location text UNIQUE
);

CREATE TABLE plans (
    id serial PRIMARY KEY,
    day integer NOT NULL,
    activity text NOT NULL,
    slug text REFERENCES locations (slug)
);