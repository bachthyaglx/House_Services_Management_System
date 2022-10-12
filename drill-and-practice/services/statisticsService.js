import { executeQuery } from "../database/database.js";

const totalTopics = async () => {
  const res = await executeQuery(`SELECT COUNT(*) AS total FROM topics;`);

  return res.rows[0].total;
};

const totalQuestions = async () => {
  const res = await executeQuery(`SELECT COUNT(*) AS total FROM questions;`);

  return res.rows[0].total;
};

const totalUserAnswers = async () => {
  const res = await executeQuery(`SELECT COUNT(*) AS total FROM question_answers;`);

  return res.rows[0].total;
};

export { totalTopics, totalQuestions, totalUserAnswers };