import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as answersController from "./controllers/answersController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionAnswerAPI from "./apis/questionAnswerAPI.js";

const router = new Router();

// Handle mainpage 
router.get("/", mainController.showMain);

// Handle TOPICS
router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

// Handle QUESTIONS
router.get("/topics/:id", questionsController.listQuestions);
router.get("/topics/:tId", questionsController.listQuestions); /* */
router.post("/topics/:id/questions", questionsController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionsController.deleteQuestion); /* */

// Handle OPTION_ANSWERS
router.get("/topics/:id/questions/:qId", answersController.listAnswers);
router.post("/topics/:id/questions/:qId/options", answersController.addAnswer);

router.get("/topics/:tId/questions/:qId", answersController.listAnswers); /* */
router.post("/topics/:tId/questions/:qId/options/:oId/delete", answersController.deleteAnswer); /* */

// Handle register form
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

// Handle login form
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

// Handle quiz
router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.pickRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.quizAnswers);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.storeAnswer);

router.get("/quiz/:tId/questions/:qId/correct", quizController.solution);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.solution);

// Handle API
router.get("/api/questions/random", questionAnswerAPI.randomQuestion);
router.post("/api/questions/answer", questionAnswerAPI.listQuestionsAnswer)

export { router };