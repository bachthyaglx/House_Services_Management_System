import { executeQuery } from "../database/database.js";

const listAvailableTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics;`);

  return res.rows;
};

const listAvailableQuestions = async (topicID) => {
    const res = await executeQuery(`SELECT id FROM questions WHERE topic_id=$1;`,topicID);
  
    return res.rows;
};

const storeAnswer = async (userID, questionID, answerID) => {

    await executeQuery(`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($1, $2, $3);`, userID, questionID, answerID);
};

const correctness = async (answerID) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE id=$1;`, answerID);
  
    return res.rows[0];
};

const getCorrectAnswer = async (questionID) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id=$1 AND is_correct=true;`, questionID);
  
    return res.rows[0];
}; 

export { listAvailableTopics, listAvailableQuestions, storeAnswer, correctness, getCorrectAnswer };