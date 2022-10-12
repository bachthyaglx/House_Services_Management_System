import { executeQuery } from "../database/database.js";

const listAllQuestions = async () => {
    const res = await executeQuery(`SELECT * FROM questions`);
    
    return res.rows;
};

const listAvailableQuestions = async (topicID) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE topic_id=$1;`,topicID);
    
    return res.rows;
};

const listSpecificQuestion = async (answerID) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE id=$1;`,answerID);
  
    return res.rows[0];
};

const addQuestion = async (userID, topicID, question) => {
    await executeQuery(`INSERT INTO questions (user_id, topic_id, question_text) VALUES ($1, $2, $3);`, userID, topicID, question);
};

const deleteQuestion = async (questionID) => {
    await executeQuery(`DELETE FROM questions WHERE id=$1`,questionID);
};
  
export { listAllQuestions, listAvailableQuestions, listSpecificQuestion, addQuestion, deleteQuestion };