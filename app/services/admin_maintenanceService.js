import { executeQuery } from "../database/database.js";

const showMaintenanceRequest = async () => {
  const result = await executeQuery(
    `SELECT t.id, t3.firstname, t3.lastname, t3.email, t5.type, t4.address, t4.zipcode, t4.city, t1.type_request, t.date_report, t.resolve 
        FROM maintenance as t
        INNER JOIN services AS t1 ON t.service_id = t1.id
        INNER JOIN rents AS t2 ON t.rent_id = t2.id
        INNER JOIN users AS t3 ON t2.user_id = t3.id 
        INNER JOIN rooms AS t4 ON t2.room_id = t4.id 
        INNER JOIN apartments AS t5 ON t4.apartment_id = t5.id;`,
  );
  return result.rows;
};

const searchMaintenanceStatus = async (status) => {
  const result = await executeQuery(
    `SELECT t3.firstname, t3.lastname, t3.email, t5.type, t4.address, t4.zipcode, t4.city, t1.type_request, t.date_report, t.resolve 
        FROM maintenance as t
        INNER JOIN services AS t1 ON t.service_id = t1.id
        INNER JOIN rents AS t2 ON t.rent_id = t2.id
        INNER JOIN users AS t3 ON t2.user_id = t3.id 
        INNER JOIN rooms AS t4 ON t2.room_id = t4.id 
        INNER JOIN apartments AS t5 ON t4.apartment_id = t5.id
        WHERE t.resolve=$status;`,
    { status: status },
  );
  return result.rows;
};

const showMaintenanceRequestUser = async (ID) => {
  const result = await executeQuery(
    `SELECT t.id, t3.firstname, t3.lastname, t3.email, t5.type, t4.address, t4.zipcode, t4.city, t1.type_request, t.date_report, t.resolve 
        FROM maintenance as t
        INNER JOIN services AS t1 ON t.service_id = t1.id
        INNER JOIN rents AS t2 ON t.rent_id = t2.id
        INNER JOIN users AS t3 ON t2.user_id = t3.id 
        INNER JOIN rooms AS t4 ON t2.room_id = t4.id 
        INNER JOIN apartments AS t5 ON t4.apartment_id = t5.id
        WHERE t.id=$id;`, {id: ID}
  );
  return result.rows;
};

const updateMaintenanceStatus = async (status, maintenanceID) => {
  const result = await executeQuery(
    `UPDATE maintenance SET resolve=$status WHERE id=$id;`,
    { status: status,
      id: maintenanceID
    },
  );
  return result.rows;
};

export {
  searchMaintenanceStatus,
  showMaintenanceRequest,
  showMaintenanceRequestUser,
  updateMaintenanceStatus,
};
