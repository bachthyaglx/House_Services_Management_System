import { executeQuery } from "../database/database.js";

const paymentDeposit = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM rents WHERE user_id=$user_id;`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

const paymentMonthlyPaid = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM monthlypaid WHERE rent_id IN (SELECT id FROM rents WHERE user_id=$user_id);`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

export { paymentDeposit, paymentMonthlyPaid };
