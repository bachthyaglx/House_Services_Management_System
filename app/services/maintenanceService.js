import { executeQuery } from "../database/database.js";

const displayListMaintenance = async () => {
  const result = await executeQuery(`SELECT * FROM services;`);
  return result.rows;  
};

const checkMaintenence = async (userID) => {
  const result = await executeQuery(`SELECT * FROM maintenance WHERE rent_id=(SELECT id FROM rents WHERE user_id=$user_id AND deposit_paid='Yes');`, {user_id: userID});
  return result.rows;  
};

const checkRent = async (userID) => {
  const result = await executeQuery(`SELECT * FROM rents WHERE user_id=$user_id AND deposit_paid='Yes';`, {user_id: userID});
  return result.rows;  
};

const submitRequestMaintenance = async (rentID, serviceID) => {
  const result = await executeQuery(`INSERT INTO maintenance(rent_id, service_id, date_report) VALUES($rent_id, $service_id, current_date);`, 
  {
    rent_id: rentID,
    service_id: serviceID
  });
  return result.rows;  
};


export { displayListMaintenance, checkMaintenence, checkRent, submitRequestMaintenance};
