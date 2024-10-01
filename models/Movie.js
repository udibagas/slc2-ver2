const pool = require("../db/connection");

class Movie {
  static genres = [
    "animation",
    "comedy",
    "drama",
    "horor",
    "religious",
    "thriller",
  ];

  constructor(
    id,
    name,
    released_year,
    genre,
    ProductionHouseId,
    productionHouse
  ) {
    this.id = id;
    this.name = name;
    this.released_year = released_year;
    this.genre = genre;
    this.ProductionHouseId = ProductionHouseId;
    this.productionHouse = productionHouse;
  }

  static async findAll() {
    const query = `
      SELECT 
        m.*,
        ph."name_prodHouse" AS "productionHouse"
      FROM "Movies" m
      JOIN "ProductionHouses" ph ON ph.id = m."ProductionHouseId"
      ORDER BY "released_year" DESC;
    `;

    const { rows } = await pool.query(query);

    return rows.map((el) => {
      const {
        id,
        name,
        released_year,
        genre,
        ProductionHouseId,
        productionHouse,
      } = el;
      return new Movie(
        id,
        name,
        released_year,
        genre,
        ProductionHouseId,
        productionHouse
      );
    });
  }

  static async findById(movieId) {
    const query = `
      SELECT 
        m.*,
        ph."name_prodHouse" AS "productionHouse"
      FROM "Movies" m
      JOIN "ProductionHouses" ph ON ph.id = m."ProductionHouseId"
      WHERE m.id = $1
    `;

    const { rows, rowCount } = await pool.query(query, [movieId]);

    if (rowCount == 0) throw new Error("Movie not found");

    const {
      id,
      name,
      released_year,
      genre,
      ProductionHouseId,
      productionHouse,
    } = rows[0];

    return new Movie(
      id,
      name,
      released_year,
      genre,
      ProductionHouseId,
      productionHouse
    );
  }

  static async create(payload) {
    const { name, released_year, genre, ProductionHouseId } = payload;

    this.validate({ name, released_year });

    const query = `
      INSERT INTO "Movies"
        ("name", "released_year", "genre", "ProductionHouseId")
      VALUES
        ($1, $2, $3, $4)
    `;

    await pool.query(query, [name, released_year, genre, ProductionHouseId]);
  }

  static async destroy(id) {
    const movie = await this.findById(id);

    if (movie.released_year == new Date().getFullYear()) {
      throw new Error("Movie baru ga boleh dihapus");
    }

    await pool.query(`DELETE FROM "Movies" WHERE id = $1`, [id]);
  }

  static async update(id, { name, released_year, genre, ProductionHouseId }) {
    this.validate({ name, released_year });

    const query = `
      UPDATE "Movies"
      SET
        "name" = $1,
        "released_year" = $2,
        "genre" = $3,
        "ProductionHouseId" = $4
      WHERE id = $5
    `;

    await pool.query(query, [
      name,
      released_year,
      genre,
      ProductionHouseId,
      id,
    ]);
  }

  static validate({ name, released_year }) {
    const errors = [];

    if (!name) {
      errors.push("Name is required");
    }

    const currentYear = new Date().getFullYear();

    if (Number(released_year) > currentYear) {
      errors.push(`Max released year is current year`);
    }

    if (errors.length > 0) {
      throw new Error(errors.join(","));
    }

    return true;
  }
}

module.exports = Movie;
