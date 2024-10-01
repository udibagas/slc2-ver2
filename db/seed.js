const fs = require("fs");
const pool = require("./connection");

const data = JSON.parse(fs.readFileSync("./productionHouses.json"))
  .map((el) => {
    return `('${el.name}', '${el.headquarters}')`;
  })
  .join(",\n");

const query = `
  INSERT INTO "ProductionHouses" ("name_prodHouse", "headquarters") 
  VALUES
    ${data}
  RETURNING *
`;

(async () => {
  try {
    const { rows } = await pool.query(query);
    console.table(rows);
  } catch (error) {
    console.log(error.message);
  }
})();
