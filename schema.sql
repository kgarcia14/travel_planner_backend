CREATE TABLE plans (
    id serial PRIMARY KEY,
    slug text NOT NULL,
    location text NOT NULL,
    day text NOT NULL,
    activity text NOT NULL
)