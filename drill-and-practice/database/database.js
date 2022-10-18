import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;

let connectionPool;
if (Deno.env.get("DATABASE_URL")) {
  connectionPool = new Pool(
    Deno.env.get("DATABASE_URL"),
    CONCURRENT_CONNECTIONS,
  );
} else {
  connectionPool = new Pool({
    user: "owpceiol",
    password: "iSviFqLc7AL_T_HJbFKuyNStlH7W2p3s",
    hostname: "manny.db.elephantsql.com",
    database: "owpceiol",
    port: 5432,
  }, CONCURRENT_CONNECTIONS);
}

// const connectionPool = new Pool({
//   user: "zavcdtgy",
//   password: "aKQ70MrydUP9rnQIjtmTC2RsReRrYR2N",
//   hostname: "mouse.db.elephantsql.com",
//   database: "thesis",
//   port: 5432,
// }, CONCURRENT_CONNECTIONS);

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
