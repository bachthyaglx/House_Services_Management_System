import { executeQuery } from "../database/database.js";

const listAllQuestionsAnswer = async () => {
    const res = await executeQuery(`SELECT * FROM question_answers;`);
    
    return res.rows;
};

const trueFalse = async (answerID) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE id=$1;`, answerID);
    
    return res.rows[0];
};

export { listAllQuestionsAnswer, trueFalse };