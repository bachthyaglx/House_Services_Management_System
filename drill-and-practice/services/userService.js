import { executeQuery } from "../database/database.js";

const addUser = async (firstname, lastname, birthdate, gender, securityid, city, address, zipcode, email, password) => {
  await executeQuery(`INSERT INTO users (firstname, lastname, birthdate, gender, securityid, city, address, zipcode, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, firstname, lastname, birthdate, gender, securityid, city, address, zipcode, email, password);
};

const findUserByEmail = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email=$1",email);
    return result.rows;
};

export { addUser, findUserByEmail };