import { executeQuery } from "../database/database.js";

const checkTerminationApplication = async (userID) => {
  const result = await executeQuery(`SELECT * FROM application WHERE user_id=$user_id`, {user_id: userID});
  return result.rows;
};

const checkTerminationRent = async (userID) => {
  const result = await executeQuery(`SELECT * FROM rents WHERE user_id=$user_id`, {user_id: userID});
  return result.rows;
};

const check_notMonthlyPaid = async (userID) => {
  const result = await executeQuery(`SELECT count(monthly_paid) FROM monthlypaid WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id) AND monthly_paid='No';`, {user_id: userID});
  return result.rows;
};

const deleteApplication = async (userID) => {
  await executeQuery(`DELETE FROM application WHERE user_id = $user_id;`, {user_id: userID});
  await executeQuery(`ALTER SEQUENCE application_id_seq RESTART WITH 1;`);

};

const deleteRents = async (userID) => {
  await executeQuery(`DELETE FROM monthlypaid WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id;);`, {user_id: userID});
  await executeQuery(`ALTER SEQUENCE monthlypaid_id_seq RESTART WITH 1;`);
  await executeQuery(`DELETE FROM maintenance WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id);`, {user_id: userID});
  await executeQuery(`ALTER SEQUENCE maintenance_id_seq RESTART WITH 1;`);
  await executeQuery(`DELETE FROM rents WHERE user_id = $user_id;`, {user_id: userID});
  await executeQuery(`ALTER SEQUENCE rents_id_seq RESTART WITH 1;`);
};

export { deleteApplication, deleteRents, checkTerminationApplication, checkTerminationRent, check_notMonthlyPaid };
