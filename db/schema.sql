DROP TABLE IF EXISTS "Movies", "ProductionHouses";

CREATE TABLE IF NOT EXISTS "ProductionHouses" (
    id SERIAL PRIMARY KEY,
    "name_prodHouse" VARCHAR,
    "headquarters" VARCHAR
);

CREATE TABLE IF NOT EXISTS "Movies" (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "released_year" INTEGER,
    "genre" VARCHAR,
    "ProductionHouseId" INT REFERENCES "ProductionHouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);