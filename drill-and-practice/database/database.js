import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  user: "gwgvqikm",
  password: "saOvCr5kRjjhHSTDxbjugpeO7LGdDglN",
  hostname: "mouse.db.elephantsql.com",
  database: "gwgvqikm",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
