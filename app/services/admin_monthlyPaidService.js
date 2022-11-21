import { executeQuery } from "../database/database.js";

//Function calculating number of months between 2 dates
const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

//Function convert date to YYYY-MM-01
const convertDate = (t) => {
  var date = new Date(t);
  var convert = date.toLocaleDateString();
  var result = convert.split("/")
  return `${result[2]}-${result[0]}-01`;
};

//Function setup duedate monthly
const duedateMonthly = (t) => {
  var date = new Date(t);
  date.setDate(date.getDate() + 7);
  var convert = date.toLocaleDateString();
  var result = convert.split("/");
  return `${result[2]}-${result[0]}-${result[1]}`;
};

const showMonthlyPaidList = async () => {
  var rent_IDs = await executeQuery(`SELECT DISTINCT rent_id FROM monthlypaid;`);
  //Insert new monthly rents for all users && delete old months if paid already! DB only stores 3 latest monthly rents 
  for (let i = 0; i < rent_IDs.rows.length; i++) {
    let get_min_month = await executeQuery(`SELECT min(TO_CHAR(date(month), 'yyyy-mm-dd')) FROM monthlypaid WHERE rent_id=$rent_id;`, { rent_id: rent_IDs.rows[i].rent_id });
    let min_month = new Date(get_min_month.rows[0].min);
    let current_month = new Date();
    //Insert new monthly rents
    while(monthDiff(min_month, current_month)>0) {
      min_month.setMonth(min_month.getMonth() + 1);
      await executeQuery(`INSERT INTO monthlypaid (rent_id, month, duedate_monthly) SELECT $rent_id, $month, $duedate_monthly WHERE NOT EXISTS (SELECT month FROM monthlypaid WHERE month=$month);`, 
        { rent_id: rent_IDs.rows[i].rent_id,
          month: convertDate(min_month),
          duedate_monthly: duedateMonthly(convertDate(min_month))
        }
      );
    }
    //Delete old months
    let min_month1 = new Date(get_min_month.rows[0].min);
    while(monthDiff(min_month1, current_month)>2) {
      await executeQuery(`DELETE FROM monthlypaid WHERE rent_id=$rent_id AND month=$month AND monthly_paid='Yes';`, 
        { rent_id: rent_IDs.rows[i].rent_id,
          month: min_month1,
        }
      );
      await executeQuery(`ALTER SEQUENCE monthlypaid_id_seq RESTART WITH 1;`);
      min_month1.setMonth(min_month1.getMonth() + 1);
    }
  }

  const result = await executeQuery(
    `SELECT t1.user_id, t2.firstname, t2.lastname, t2.gender, t4.type, t1.room_id, t3.city, t3.zipcode, t3.address, t4.price, t.month, t.duedate_monthly, t.monthly_paid
        FROM monthlypaid AS t
        INNER JOIN rents AS t1 ON t.rent_id = t1.id
        INNER JOIN users AS t2 ON t1.user_id = t2.id
        INNER JOIN rooms AS t3 ON t1.room_id = t3.id
        INNER JOIN apartments AS t4 ON t3.apartment_id = t4.id
        ORDER BY month ASC;`,
  );

  return result.rows;
};

const checkMonthlyPaidStatus = async (status) => {
  const result = await executeQuery(
    `SELECT t1.user_id, t2.firstname, t2.lastname, t2.gender, t4.type, t1.room_id, t3.city, t3.zipcode, t3.address, t4.price, t.month, t.duedate_monthly, t.monthly_paid
        FROM monthlypaid AS t
        INNER JOIN rents AS t1 ON t.rent_id = t1.id
        INNER JOIN users AS t2 ON t1.user_id = t2.id
        INNER JOIN rooms AS t3 ON t1.room_id = t3.id
        INNER JOIN apartments AS t4 ON t3.apartment_id = t4.id
        WHERE t.monthly_paid=$monthly_paid
        ORDER BY month ASC;`,
    {
      monthly_paid: status,
    },
  );

  return result.rows;
};

export { checkMonthlyPaidStatus, showMonthlyPaidList };
