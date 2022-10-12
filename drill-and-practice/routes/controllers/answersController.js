import * as answersService from "../../services/answersService.js";
import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const validationRules_answer = {
    answer: [validasaur.required, validasaur.minLength(1)],
};

const getAnswer = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    
    return {
        answer: params.get("option_text"),
        checkbox: params.get("is_correct") ? true : false,
    };
};

const addAnswer = async ({ request, response, render, params }) => {
    const answerData = await getAnswer(request);
    
    const [passes, errors] = await validasaur.validate(
        answerData,
        validationRules_answer,
    );

    if (!passes) {
        answerData.answerErrors = errors;
        render("answers.eta", {
            availableAnswers: await answersService.listAvailableAnswers(params.qId),  
            specificQuestion: await questionsService.listSpecificQuestion(params.qId),
            specificTopic: await topicsService.listSpecificTopic(params.id),
            validateAnswer: answerData.answerErrors,
        });
    } else {
        await answersService.addAnswer(params.qId, answerData.answer, answerData.checkbox);
        
        response.redirect("/topics/" + `${params.id}` + "/questions/" + `${params.qId}`);
    }
};

const deleteAnswer = async ({ params, response }) => {
    await answersService.deleteAnswer(params.oId);
    response.redirect("/topics/" + `${params.tId}` + "/questions/" + `${params.qId}`);
}; 

const listAnswers = async ({ render, params, user }) => {
    render("answers.eta", {
      availableAnswers: await answersService.listAvailableAnswers(params.qId),  
      specificQuestion: await questionsService.listSpecificQuestion(params.qId),
      specificTopic: await topicsService.listSpecificTopic(params.id),
    });
};

export { listAnswers, addAnswer, deleteAnswer };