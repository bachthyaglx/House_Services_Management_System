import { executeQuery } from "../database/database.js";

const displayTable = async () => {
  const table1 = await executeQuery(
    `SELECT tr1.firstname, tr1.lastname, tr1.gender, tr1.email, tr2.type, tr2.price, t.date_request, t.date_rent
        FROM application AS t 
        INNER JOIN users AS tr1 ON t.user_id = tr1.id
        INNER JOIN apartments AS tr2 ON t.apartment_id = tr2.id
        ORDER BY date_rent ASC;`
  );

//   const table2 = await executeQuery(
//     `SELECT city, zipcode, address FROM rooms WHERE apartment_id IN (SELECT id FROM apartments WHERE type=$type);`,{
//         type: apartmentType
//     }
//   );

  return table1.rows;
};

export { displayTable };
