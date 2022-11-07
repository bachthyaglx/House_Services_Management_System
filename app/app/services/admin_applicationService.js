import { executeQuery } from "../database/database.js";

const displayListUserInfo = async () => {
  const table1 = await executeQuery(
    `SELECT tr1.id, tr1.firstname, tr1.lastname, tr1.gender, tr1.email, tr2.type, tr2.price, t.date_request, t.date_rent
        FROM application AS t 
        INNER JOIN users AS tr1 ON t.user_id = tr1.id
        INNER JOIN apartments AS tr2 ON t.apartment_id = tr2.id
        ORDER BY date_rent ASC;`,
  );

  return table1.rows;
};

const displayListRoom = async (firstname, sex) => {
  const table2 = await executeQuery(
    `SELECT id, city, zipcode, address FROM rooms AS t WHERE apartment_id IN (SELECT apartment_id FROM application WHERE user_id IN (SELECT id FROM users AS c WHERE firstname=$firstname)) AND (t.sex='' OR t.sex=$sex)`,
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

const approveRoom = async (userID, roomID, dateStart, duedateDeposit) => {
  await executeQuery(
    `INSERT INTO rents (user_id, room_id, datestart, duedate_deposit) VALUES ($userID, $roomID, $dateStart, $duedateDeposit)`,
    {
      userID: userID,
      roomID: roomID,
      dateStart: dateStart,
      duedateDeposit: duedateDeposit,
    },
  );
};

export { approveRoom, displayListRoom, displayListUserInfo, displayUserInfo };
