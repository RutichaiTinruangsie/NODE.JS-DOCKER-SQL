const sql = require("mssql");
const { config } = require("./config");

const executeSQL = async (query) =>
  new Promise(async (resolve) => {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(query);

      if (result.recordset !== undefined) {
        resolve(result.recordset);
      } else {
        resolve({
          status: "success",
          message: result.rowAffected + "row affected",
        });
      }
    } catch (error) {
      resolve({ status: "failed", message: error.message, sql: query });
    }
  });

module.exports = {
  executeSQL,
};
