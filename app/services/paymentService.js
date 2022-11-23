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

const payDeposit = async (userID) => {
  await executeQuery(
    `UPDATE rents SET deposit_paid='Yes' WHERE user_id=$user_id;`,
    {
      user_id: userID,
    },
  );

  const firstRent = await executeQuery(
    `SELECT datestart FROM rents WHERE user_id=$user_id;`,
    {
      user_id: userID,
    },
  );

  let duedateFirstRent = () => {
    var duedateFirstRent = new Date(`${firstRent.rows[0].datestart}`);
    duedateFirstRent.setDate(duedateFirstRent.getDate() + 7);
    var convert = duedateFirstRent.toLocaleDateString();
    var result = convert.split("/");
    return `${result[2]}-${result[0]}-${result[1]}`;
  };

  await executeQuery(
    `INSERT INTO monthlypaid(rent_id, month)
     SELECT id, datestart FROM rents 
     WHERE user_id=$user_id;`,
    {
      user_id: userID,
    },
  );

  await executeQuery(
    `UPDATE monthlypaid SET duedate_monthly=$dutedateMonthlyPaid, monthly_paid='No'
     WHERE rent_id = (SELECT id from rents WHERE user_id=$user_id);`,
    {
      dutedateMonthlyPaid: duedateFirstRent(),
      user_id: userID,
    },
  );
};

const paymentMonthlyPaid = async (userID) => {
  const result = await executeQuery(
    `SELECT t.id, t1.firstname, t1.lastname, t1.gender, t2.type, t3.address, t3.zipcode, t3.city, t2.price, t.month, t.duedate_monthly, t.monthly_paid, current_date
        FROM monthlypaid AS t
        INNER JOIN rents AS t4 ON t.rent_id = t4.id
        INNER JOIN users AS t1 ON t4.user_id = t1.id 
        INNER JOIN rooms AS t3 ON t4.room_id = t3.id
        INNER JOIN apartments AS t2 ON t3.apartment_id = t2.id
        WHERE t.rent_id = (SELECT id FROM rents WHERE user_id=$user_Id)
        ORDER BY month DESC;`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

const calculate_No_Paid = async (userID) => {
  const result = await executeQuery(
    `SELECT count(month) FROM monthlypaid 
     WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id) AND monthly_paid='No';`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

const payMonthlyPaid = async (userID, id) => {
  await executeQuery(
    `UPDATE monthlypaid SET monthly_paid='Yes' WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id) AND id=$id;`,
    {
      user_id: userID,
      id: id,
    },
  );
};

export { payDeposit, paymentDeposit, paymentMonthlyPaid, payMonthlyPaid, calculate_No_Paid };
