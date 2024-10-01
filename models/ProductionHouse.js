const pool = require("../db/connection");

class ProductionHouse {
  constructor(id, name_prodHouse, headquarters) {
    this.id = id;
    this.name_prodHouse = name_prodHouse;
    this.headquarters = headquarters;
  }

  static async findAll() {
    const query = `
      SELECT *
      FROM "ProductionHouses"
      ORDER BY "name_prodHouse" ASC
    `;

    const { rows } = await pool.query(query);
    return rows.map((el) => {
      return new ProductionHouse(el.id, el.name_prodHouse, el.headquarters);
    });
  }
}

module.exports = ProductionHouse;
