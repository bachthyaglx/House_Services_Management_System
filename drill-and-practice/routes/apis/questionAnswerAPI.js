import * as questionsService from "../../services/questionsService.js";
import * as answersService from "../../services/answersService.js";
import * as questionAnswersService from "../../services/questionAnswersService.js";

const randomQuestion = async ({ response }) => {
    const API_answers = [];
    const API_questions = {};

    const randomQuestion = await questionsService.listAllQuestions();

    const random = Math.floor(Math.random() * randomQuestion.length);

    API_questions.questionId = randomQuestion[random].id;
    API_questions.questionText = randomQuestion[random].question_text;    

    const specificAnswers = await answersService.listAvailableAnswers(randomQuestion[random].id);

    specificAnswers.forEach(i => {
        var data = {
            "optionId": '',
            "optionText": '',
        };
        
        data.optionId = i.id;
        data.optionText = i.option_text;

        API_answers.push(data);
    });

    API_questions.answerOptions = API_answers;

    console.log(API_questions);

    response.body = API_questions;
    
};

const listQuestionsAnswer = async ({ response }) => { 
    const API_questions = [];
    const result = await questionAnswersService.listAllQuestionsAnswer();

    for(var i=0; i<result.length; i++) {
        var data = {
            questionId: '',
            optionId: '',
            correct: '',
        };

        data.questionId = result[i].question_id;
        data.optionId = result[i].question_answer_option_id;
        data.correct = (await questionAnswersService.trueFalse(result[i].question_answer_option_id)).is_correct;

        API_questions.push(data);
    }

    console.log(API_questions);

    response.body = API_questions;
};

export { randomQuestion, listQuestionsAnswer };