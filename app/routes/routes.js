import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as apartmentsController from "./controllers/apartmentsController.js";
import * as registerController from "./controllers/registerController.js";
import * as loginController from "./controllers/loginController.js";
import * as logoutController from "./controllers/logoutController.js";
import * as applicationController from "./controllers/applicationController.js";
import * as terminationController from "./controllers/terminationController.js";
import * as paymentController from "./controllers/paymentController.js";

import * as admin_applicationController from "./controllers/admin_applicationController.js";
import * as admin_depositController from "./controllers/admin_depositController.js";
import * as admin_monthlyPaidController from "./controllers/admin_monthlyPaidController.js";
import * as admin_terminationController from "./controllers/admin_terminationController.js";

// import * as topicsController from "./controllers/topicsController.js";
// import * as questionsController from "./controllers/questionsController.js";
// import * as answersController from "./controllers/answersController.js";
// import * as quizController from "./controllers/quizController.js";
// import * as questionAnswerAPI from "./apis/questionAnswerAPI.js";
const router = new Router();

//--------------------------------------------USER-------------------------------------------------
// Handle mainpage
router.get("/", mainController.showMain);

// Handle apartments
router.get("/apartments", apartmentsController.showApartments);

// Handle register
router.get("/auth/register", registerController.showRegistrationForm);
router.post("/auth/register", registerController.registerUser);

// Handle login form
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

// Handle logout form
router.get("/auth/logout", logoutController.processLogout);

// Handle application
router.get("/application", applicationController.showApplicationForm);
router.post("/application/submit", applicationController.submitApplication);
router.post("/application/update", applicationController.updateApplication);

// Handle termination
router.get("/termination/application", terminationController.showTerminationApplication);
router.post("/termination/application", terminationController.deleteApplication);
router.get("/termination/rent", terminationController.showTerminationRent);
router.post("/termination/rent", terminationController.deleteRents);

// Handle payment
router.get("/payment/deposit", paymentController.paymentDepositAction);
router.post("/payment/deposit", paymentController.payDeposit);
router.get("/payment/monthly-paid", paymentController.paymentMonthlyPaidAction);
router.post("/payment/monthly-paid", paymentController.payMonthlyPaid);

//----------------------------------------ADMIN---------------------------------------------------
// Handle APPLICATION for ADMIN
router.get("/admin-application", admin_applicationController.showApplicationList);
router.get("/admin-application/user/:uID", admin_applicationController.showPossibleRoom);
router.post("/admin-application/user/:uID", admin_applicationController.approveRoom);

// Handle DEPOSIT CHECKS for ADMIN
router.get("/admin-deposit", admin_depositController.showDepositList);
router.post("/admin-deposit", admin_depositController.showDepositStatus);

// Handle MONTHLY PAID CHECKS for ADMIN
router.get("/admin-monthly-paid", admin_monthlyPaidController.showMonthlyPaidList);
router.post("/admin-monthly-paid", admin_monthlyPaidController.checkMonthlyPaidStatus);

// Handle TERMINATION for ADMIN
router.get("/admin-termination/application", admin_terminationController.displayApplicationList);
router.post("/admin-termination/application/user/:uID", admin_terminationController.deleteApplication);
router.get("/admin-termination/deposit", admin_terminationController.duedateNotPaidDeposit);
router.post("/admin-termination/deposit/user/:uID", admin_terminationController.terminateDeposit);
router.get("/admin-termination/monthly-paid", admin_terminationController.duedateNotMonthlyPaid);
router.post("/admin-termination/monthly-paid/room/:rID", admin_terminationController.terminateMonthlyPaid);

// // Handle TOPICS
// router.get("/topics", topicsController.listTopics);
// router.post("/topics", topicsController.addTopic);
// router.post("/topics/:id/delete", topicsController.deleteTopic);

// // Handle QUESTIONS
// router.get("/topics/:id", questionsController.listQuestions);
// router.get("/topics/:tId", questionsController.listQuestions); /* */
// router.post("/topics/:id/questions", questionsController.addQuestion);
// router.post(
//   "/topics/:tId/questions/:qId/delete",
//   questionsController.deleteQuestion,
// ); /* */

// // Handle OPTION_ANSWERS
// router.get("/topics/:id/questions/:qId", answersController.listAnswers);
// router.post("/topics/:id/questions/:qId/options", answersController.addAnswer);

// router.get("/topics/:tId/questions/:qId", answersController.listAnswers); /* */
// router.post(
//   "/topics/:tId/questions/:qId/options/:oId/delete",
//   answersController.deleteAnswer,
// ); /* */

// // Handle quiz
// router.get("/quiz", quizController.listTopics);
// router.get("/quiz/:tId", quizController.pickRandomQuestion);
// router.get("/quiz/:tId/questions/:qId", quizController.quizAnswers);
// router.post(
//   "/quiz/:tId/questions/:qId/options/:oId",
//   quizController.storeAnswer,
// );

// router.get("/quiz/:tId/questions/:qId/correct", quizController.solution);
// router.get("/quiz/:tId/questions/:qId/incorrect", quizController.solution);

// // Handle API
// router.get("/api/questions/random", questionAnswerAPI.randomQuestion);
// router.post("/api/questions/answer", questionAnswerAPI.listQuestionsAnswer);

export { router };
