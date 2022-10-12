import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const validationRules_question = {
  question: [validasaur.required, validasaur.minLength(1)]
};

const getQuestion = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    question: params.get("question_text"),
  };
};

const addQuestion = async ({ request, response, render, params, user }) => {
  const questionData = await getQuestion(request);

  const [passes, errors] = await validasaur.validate(questionData, validationRules_question);

  if (!passes) {
    questionData.questionErrors = errors;
    render("questions.eta", {
      availableQuestions: await questionsService.listAvailableQuestions(params.id),
      specificTopic: await topicsService.listSpecificTopic(params.id),
      validateQuestion: questionData.questionErrors,
    });
  } else {
    await questionsService.addQuestion(user.id, params.id, questionData.question);
    response.redirect("/topics/" + `${params.id}`);
  }
};

const deleteQuestion = async ({ params, response }) => {
  await questionsService.deleteQuestion(params.qId);

  response.redirect("/topics/" + `${params.tId}`);
};

const listQuestions = async ({ render, params, user }) => {
  render("questions.eta", {
    availableQuestions: await questionsService.listAvailableQuestions(params.id),
    specificTopic: await topicsService.listSpecificTopic(params.id),
    // claimedChores: await topicsService.listUserChores(user.id),
  });
};

export { listQuestions, addQuestion, deleteQuestion };