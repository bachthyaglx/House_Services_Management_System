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

const payDeposit = async (userID) => {
  await executeQuery(
    `UPDATE rents SET deposit_paid='Yes' WHERE user_id=$user_id;`,
    {
      user_id: userID,
    },
  );
  await executeQuery(
    `INSERT INTO monthlypaid(rent_id, duedate_monthly);`,
    {
      user_id: userID,
    },
  );
};

const payMonthlyPaid = async (userID) => {
  await executeQuery(
    `UPDATE monthlypaid SET monthly_paid='Yes' WHERE rent_id IN (SELECT id FROM rents WHERE user_id=$user_id);`,
    {
      user_id: userID,
    },
  );
};

export { payDeposit, paymentDeposit, paymentMonthlyPaid, payMonthlyPaid };
