import { executeQuery } from "../database/database.js";

const getApartmentID = async (apartmentType) => {
  const result = await executeQuery(
    `SELECT * FROM apartments WHERE type=$type`,
    {
      type: apartmentType,
    },
  );
  return result.rows;
};

const submitApplication = async (
  userID,
  apartmentID,
  dateRent,
) => {
  await executeQuery(
    `INSERT INTO application (user_id, apartment_id, date_request, date_rent) VALUES ($userID, $apartmentID, CURRENT_DATE, $date_rent);`,
    {
      userID: userID,
      apartmentID: apartmentID,
      date_rent: dateRent,
    },
  );
};

const userApplication = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM application WHERE user_id=$user_id`,
    {
      user_id: userID,
    },
  );
  return result.rows;
};

const updateApplication = async (apartmentID, dateRent, userID) => {
  await executeQuery(
    `UPDATE application SET apartment_id=$apartment_id, date_rent=$date_rent WHERE user_id=$user_id`,
    {
      apartment_id: apartmentID,
      date_rent: dateRent,
      user_id: userID,
    },
  );
};

const apartmentName = async (userID) => {
  const result = await executeQuery(
    `SELECT * FROM application WHERE user_id=$user_id`,
    {
      user_id: userID,
    },
  );

  if (!result.rows[0] || result.rows[0].length == 0) {
    return;
  } else {
    const getIDapartment = result.rows[0].apartment_id;
    const name_apartment = await executeQuery(
      `SELECT * FROM apartments WHERE id=$id`,
      {
        id: getIDapartment,
      },
    );
    return name_apartment.rows;
  }
};

export {
  apartmentName,
  getApartmentID,
  submitApplication,
  updateApplication,
  userApplication,
};
