import { executeQuery } from "../database/database.js";

const displayListMaintenance = async () => {
  await executeQuery(
    `DELETE FROM maintenance WHERE date_report < current_date - interval '3 month';`,
  );
  await executeQuery(`ALTER SEQUENCE maintenance_id_seq RESTART WITH 1;`);
  const result = await executeQuery(`SELECT * FROM services;`);
  return result.rows;
};

const userMaintenence = async (userID) => {
  const result = await executeQuery(
    `SELECT t3.id, t3.firstname, t3.lastname, t3.email, t5.type, t4.address, t4.zipcode, t4.city, t1.type_request, t.date_report, t.resolve 
        FROM maintenance as t
        INNER JOIN services AS t1 ON t.service_id = t1.id
        INNER JOIN rents AS t2 ON t.rent_id = t2.id
        INNER JOIN users AS t3 ON t2.user_id = t3.id 
        INNER JOIN rooms AS t4 ON t2.room_id = t4.id 
        INNER JOIN apartments AS t5 ON t4.apartment_id = t5.id
        WHERE t3.id=$id;`,
    { id: userID },
  );
  return result.rows;
};

const checkRent = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM rents WHERE user_id=$user_id AND deposit_paid='Yes';`,
    { user_id: userID },
  );
  return result.rows;
};

const submitRequestMaintenance = async (rentID, serviceID) => {
  const result = await executeQuery(
    `INSERT INTO maintenance(rent_id, service_id, date_report) VALUES($rent_id, $service_id, current_date);`,
    {
      rent_id: rentID,
      service_id: serviceID,
    },
  );
  return result.rows;
};

export {
  checkRent,
  displayListMaintenance,
  submitRequestMaintenance,
  userMaintenence,
};
