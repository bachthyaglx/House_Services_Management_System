import { executeQuery } from "../database/database.js";

const addUser = async (
  firstname,
  lastname,
  birthdate,
  gender,
  email,
  password,
) => {
  await executeQuery(
    `INSERT INTO users (firstname, lastname, birthdate, gender, email, password) VALUES ($firstname, $lastname, $birthdate, $gender, $email, $password);`,
    {
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      gender: gender,
      email: email,
      password: password,
    },
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    `SELECT * FROM users WHERE email=$email;`,
    { email: email },
  );
  return result.rows;
};

const showUserProfile = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM users WHERE id=$id;`,
    { id: userID },
  );
  return result.rows;
};

export { addUser, findUserByEmail, showUserProfile };
