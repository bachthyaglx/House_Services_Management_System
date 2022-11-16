import { executeQuery } from "../database/database.js";

const paymentDeposit = async (userID) => {
  const result = await executeQuery(
    `SELECT t1.firstname, t1.lastname, t1.gender, t2.type, t3.city, t3.zipcode, t3.address, t.datestart, t2.deposit, t.duedate_deposit, t.deposit_paid
        FROM rents AS t
        INNER JOIN users AS t1 ON t.user_id = t1.id
        INNER JOIN rooms AS t3 ON t.room_id = t3.id
        INNER JOIN apartments AS t2 ON t3.apartment_id = t2.id
        WHERE t.user_id = $user_id;`,
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
  // SELECT TO_CHAR(date(month), 'Day, DDth Month YYYY') FROM monthlypaid WHERE id=1;
  // await executeQuery(
  //   `INSERT INTO monthlypaid(rent_id, duedate_monthly);`,
  //   {
  //     user_id: userID,
  //   },
  // );
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
