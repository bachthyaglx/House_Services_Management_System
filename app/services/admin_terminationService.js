import { executeQuery } from "../database/database.js";

const displayApplicationList = async () => {
  const result = await executeQuery(
    `SELECT t1.id, t1.firstname, t1.lastname, t1.gender, t1.email, t2.type, t2.price, t2.deposit, t.date_request, t.date_rent 
      FROM application as t 
      INNER JOIN users as t1 ON t.user_id = t1.id
      INNER JOIN apartments as t2 ON t.apartment_id = t2.id;`,
  );
  return result.rows;
};

const deleteApplication = async (userID) => {
  await executeQuery(`DELETE FROM application WHERE user_id=$user_id;`,{ user_id: userID });
  await executeQuery(`ALTER SEQUENCE application_id_seq RESTART WITH 1;`);
};

const duedateNotPaidDeposit = async () => {
  const result = await executeQuery(
    `SELECT t.user_id, t1.firstname, t1.lastname, t1.gender, t2.type, t.room_id, t3.city, t3.zipcode, t3.address, t2.price, t.datestart, t.duedate_deposit, t.deposit_paid, CURRENT_DATE 
      FROM rents AS t
      INNER JOIN users AS t1 ON t.user_id = t1.id
      INNER JOIN rooms AS t3 ON t.room_id = t3.id
      INNER JOIN apartments AS t2 ON t3.apartment_id = t2.id
      WHERE t.deposit_paid = 'No' AND t.duedate_deposit < CURRENT_DATE;`,
  );
  return result.rows;
};

const terminateDeposit = async (userID) => {
  await executeQuery(`DELETE FROM rents WHERE user_id=$user_id;`, { user_id: userID });
  await executeQuery(`ALTER SEQUENCE rents_id_seq RESTART WITH 1;`);
};

const duedateNotMonthlyPaid = async () => {
  const result = await executeQuery(
    `SELECT t.id, t2.firstname, t2.lastname, t2.gender, t4.type, t1.room_id, t3.city, t3.zipcode, t3.address, t4.price, t.month, t.duedate_monthly, t.monthly_paid, CURRENT_DATE
      FROM monthlypaid AS t
      INNER JOIN rents AS t1 ON t.rent_id = t1.id
      INNER JOIN users AS t2 ON t1.user_id = t2.id
      INNER JOIN rooms AS t3 ON t1.room_id = t3.id
      INNER JOIN apartments AS t4 ON t3.apartment_id = t4.id
      WHERE t.monthly_paid = 'No' AND t.duedate_monthly < CURRENT_DATE
      ORDER BY month DESC;`
  );
  return result.rows;
};

const terminateMonthlyPaid = async (id) => {
  await executeQuery(`DELETE FROM monthlypaid WHERE id=$id;`, { id: id });
  await executeQuery(`ALTER SEQUENCE monthlypaid_id_seq RESTART WITH 1;`);
  await executeQuery(`DELETE FROM rents WHERE id=(SELECT rent_id FROM monthlypaid WHERE id=$id);`, { id: id });
  await executeQuery(`ALTER SEQUENCE rents_id_seq RESTART WITH 1;`);
};

export { deleteApplication, displayApplicationList, duedateNotPaidDeposit, terminateDeposit, duedateNotMonthlyPaid, terminateMonthlyPaid };
