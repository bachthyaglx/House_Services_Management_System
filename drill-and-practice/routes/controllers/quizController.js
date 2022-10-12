import * as quizService from "../../services/quizService.js";
import * as answersService from "../../services/answersService.js";
import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";


const listTopics = async ({ render }) => {
  render("quiz_topics.eta", {
    availableTopics: await quizService.listAvailableTopics(),
    // claimedChores: await topicsService.listUserChores(user.id),
  });
};

const pickRandomQuestion = async ({ response, params, render }) => {
    const listQuestionsID = await quizService.listAvailableQuestions(params.tId);

    if(listQuestionsID.length == 0) {
        render("quiz_question.eta", {
            question: "There are no questions so far for the topic.",
        });
    } else if (listQuestionsID.length > 0) {
        const random = Math.floor(Math.random() * listQuestionsID.length);
        var a = listQuestionsID[random];
        var key = Object.keys(a)[0];
    
        response.redirect("/quiz/" + `${params.tId}` + "/questions/" + `${a[key]}`);
    }  
};

const quizAnswers = async ({ response, params, render }) => {
    render("quiz_answers.eta", {
        availableAnswers: await answersService.listAvailableAnswers(params.qId),  
        specificQuestion: await questionsService.listSpecificQuestion(params.qId),
        specificTopic: await topicsService.listSpecificTopic(params.tId),
    }); 
};

const dataSolution = {
    correct: "",
    correctAnswer: "",
    specificTopic: "",
};

const storeAnswer = async ({ response, params, user }) => {
    await quizService.storeAnswer(user.id, params.qId, params.oId);

    const correctness = await quizService.correctness(params.oId);

    // Store True/False, correct answer, topic
    dataSolution.correct = correctness;
    dataSolution.correctAnswer = await quizService.getCorrectAnswer(params.qId);
    dataSolution.specificTopic = await topicsService.listSpecificTopic(params.tId);

    if(correctness.is_correct==true) {
        response.redirect("/quiz/" + `${params.tId}` + "/questions/" + `${params.qId}` + "/correct");
    } else {
        response.redirect("/quiz/" + `${params.tId}` + "/questions/" + `${params.qId}` + "/incorrect");
    }
};

const solution = async ({ render }) => {
    render("quizSolution.eta", dataSolution);
};

export { listTopics, pickRandomQuestion, quizAnswers, storeAnswer, solution };