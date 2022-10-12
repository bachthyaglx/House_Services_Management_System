import { executeQuery } from "../database/database.js";

const listAvailableAnswers = async (questionID) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id=$1;`,questionID);
    
    return res.rows;
};
  
const addAnswer = async (questionID, answer, is_correct) => {
    await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);`, questionID, answer, is_correct);
};

const deleteAnswer = async (answerID) => {
    await executeQuery(`DELETE FROM question_answer_options WHERE id=$1`, answerID);
};

export { listAvailableAnswers, addAnswer, deleteAnswer };