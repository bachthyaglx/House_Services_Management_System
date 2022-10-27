import { executeQuery } from "../database/database.js";

const checkTerminationApplication = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM application WHERE user_id=$user_id`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

const checkTerminationRent = async (userID) => {
    const result = await executeQuery(
      `SELECT * FROM rents WHERE user_id=$user_id`,
      {
        user_id: userID,
      },
    );
    return result.rows;
  };

const deleteApplication = async (userID) => {
  await executeQuery(
    `DELETE FROM application WHERE user_id = $user_id;`,
    {
      user_id: userID,
    },
  );
};

const deleteRents = async (userID) => {
  await executeQuery(
    `DELETE FROM rents WHERE user_id = $user_id;`,
    {
      user_id: userID,
    },
  );
};

export { deleteApplication, deleteRents, checkTerminationApplication, checkTerminationRent };
