import { executeQuery } from "../database/database.js";

const displayListUserInfo = async () => {
  const table1 = await executeQuery(
    `SELECT tr1.id, tr1.firstname, tr1.lastname, tr1.gender, tr1.email, tr2.type, tr2.deposit, tr2.price, t.date_request, t.date_rent
        FROM application AS t 
        INNER JOIN users AS tr1 ON t.user_id = tr1.id
        INNER JOIN apartments AS tr2 ON t.apartment_id = tr2.id
        ORDER BY date_rent ASC;`,
  );

  return table1.rows;
};

const suggestPossibleRoom = async (firstname, sex) => {
  const table2 = await executeQuery(
    `SELECT id, city, zipcode, address, sex, reserve 
        FROM rooms AS t 
        WHERE apartment_id IN (SELECT apartment_id FROM application WHERE user_id IN (SELECT id FROM users AS c WHERE c.firstname=$firstname)) 
        AND (t.sex='' OR t.sex=$sex) 
        AND t.reserve='No'
        ORDER BY address ASC;`,
    {
      firstname: firstname,
      sex: sex,
    },
  );

  return table2.rows;
};

const displayUserInfo = async (userid) => {
  const table1 = await executeQuery(
    `SELECT tr1.id, tr1.firstname, tr1.lastname, tr1.gender, tr1.email, t.date_request, t.date_rent
        FROM application AS t 
        INNER JOIN users AS tr1 ON t.user_id = tr1.id
        WHERE t.user_id=$user_id;`,
    {
      user_id: userid,
    },
  );

  return table1.rows;
};

const processAproval = async (
  userID,
  roomID,
  dateStart,
  duedateDeposit,
  sex,
) => {
  await executeQuery(
    `INSERT INTO rents (user_id, room_id, datestart, duedate_deposit) VALUES ($userID, $roomID, $dateStart, $duedateDeposit);`,
    {
      userID: userID,
      roomID: roomID,
      dateStart: dateStart,
      duedateDeposit: duedateDeposit,
    },
  );

  await executeQuery(
    `UPDATE rooms SET sex=$sex WHERE house=(SELECT house FROM rooms WHERE id=$id) AND apartment_id=(SELECT apartment_id FROM application WHERE user_id=$user_id);`,
    {
      sex: sex,
      id: roomID,
      user_id: userID,
    },
  );

  await executeQuery(
    `UPDATE rooms SET reserve='Yes' WHERE id=$id;`,
    {
      id: roomID,
    },
  );

  await executeQuery(`DELETE FROM application WHERE user_id=$user_id;`, {
    user_id: userID,
  });
};

export {
  displayListUserInfo,
  displayUserInfo,
  processAproval,
  suggestPossibleRoom,
};
