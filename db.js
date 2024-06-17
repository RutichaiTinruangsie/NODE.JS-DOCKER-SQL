// const sql = require("mssql");
// const { config } = require("./config");

// const executeSQL = async (query, app) =>
//   new Promise(async (resolve) => {
//     // try {
//     // const pool = await sql.connect(config);
//     // const result = await pool.request().query(query);
//     const result = await app.locals.db.request().query(query);

//     if (result.recordset !== undefined) {
//       resolve(result.recordset);
//     } else {
//       resolve({
//         status: "success",
//         message: result.rowAffected + "row affected",
//       });
//     }
//     // } catch (error) {
//     //   resolve({ status: "failed", message: error.message, sql: query });
//     // }
//   });

// module.exports = {
//   executeSQL,
// };

const sql = require("mssql");
const { config } = require("./config");

let pool;

const initializePool = async () => {
  try {
    pool = await sql.connect(config);
    console.log("SQL Server connected");
  } catch (err) {
    console.error("Error connecting to SQL Server:", err.message);
    throw err;
  }
};

const executeSQL = async (query) => {
  if (!pool) {
    await initializePool();
  }

  try {
    const result = await pool.request().query(query);

    if (result.recordset !== undefined) {
      return result.recordset;
    } else {
      return {
        status: "success",
        message: `${result.rowsAffected} row affected`,
      };
    }
  } catch (error) {
    return { status: "failed", message: error.message, sql: query };
  }
};

module.exports = {
  executeSQL,
};
