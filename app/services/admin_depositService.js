import { executeQuery } from "../database/database.js";

const showDepositList = async () => {
  const result = await executeQuery(
    `SELECT t.user_id, t1.firstname, t1.lastname, t1.gender, t2.type, t.room_id, t3.city, t3.zipcode, t3.address, t2.price, t.datestart, t.duedate_deposit, t.deposit_paid 
        FROM rents AS t
        INNER JOIN users AS t1 ON t.user_id = t1.id
        INNER JOIN rooms AS t3 ON t.room_id = t3.id
        INNER JOIN apartments AS t2 ON t3.apartment_id = t2.id;`,
  );

  return result.rows;
};

const checkPaidDeposit = async (status) => {
  const result = await executeQuery(
    `SELECT t.user_id, t1.firstname, t1.lastname, t1.gender, t2.type, t.room_id, t3.city, t3.zipcode, t3.address, t2.price, t.datestart, t.duedate_deposit, t.deposit_paid 
        FROM rents AS t
        INNER JOIN users AS t1 ON t.user_id = t1.id
        INNER JOIN rooms AS t3 ON t.room_id = t3.id
        INNER JOIN apartments AS t2 ON t3.apartment_id = t2.id
        WHERE t.deposit_paid=$deposit_paid;`,
    {
      deposit_paid: status,
    },
  );

  return result.rows;
};

export { checkPaidDeposit, showDepositList };
