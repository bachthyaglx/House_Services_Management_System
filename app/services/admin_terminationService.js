import { executeQuery } from "../database/database.js";

const showMonthlyPaidList = async () => {
  const result = await executeQuery(
    `SELECT t1.user_id, t2.firstname, t2.lastname, t2.gender, t4.type, t1.room_id, t3.city, t3.zipcode, t3.address, t4.price, t.duedate_monthly, t.monthly_paid
        FROM monthlypaid AS t
        INNER JOIN rents AS t1 ON t.rent_id = t1.id
        INNER JOIN users AS t2 ON t1.user_id = t2.id
        INNER JOIN rooms AS t3 ON t1.room_id = t3.id
        INNER JOIN apartments AS t4 ON t3.apartment_id = t4.id;`,
  );
  return result.rows;
};

const checkMonthlyPaidStatus = async (status) => {
  const result = await executeQuery(
    `SELECT t1.user_id, t2.firstname, t2.lastname, t2.gender, t4.type, t1.room_id, t3.city, t3.zipcode, t3.address, t4.price, t.duedate_monthly, t.monthly_paid
        FROM monthlypaid AS t
        INNER JOIN rents AS t1 ON t.rent_id = t1.id
        INNER JOIN users AS t2 ON t1.user_id = t2.id
        INNER JOIN rooms AS t3 ON t1.room_id = t3.id
        INNER JOIN apartments AS t4 ON t3.apartment_id = t4.id
        WHERE t.monthly_paid=$monthly_paid;`,
    {
        monthly_paid: status,
    },
  );

  return result.rows;
};

export { showMonthlyPaidList, checkMonthlyPaidStatus };