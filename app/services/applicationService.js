import { executeQuery } from "../database/database.js";

// const listAvailableAnswers = async (questionID) => {
//     const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id=$1;`,questionID);

//     return res.rows;
// };

// const addAnswer = async (questionID, answer, is_correct) => {
//     await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);`, questionID, answer, is_correct);
// };

// const deleteAnswer = async (answerID) => {
//     await executeQuery(`DELETE FROM question_answer_options WHERE id=$1`, answerID);
// };

// export { listAvailableAnswers, addAnswer, deleteAnswer };

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

export { getApartmentID, submitApplication, userApplication };
