import { Router } from "../deps.js";

import * as mainController from "./controllers/mainController.js";
import * as apartmentsController from "./controllers/apartmentsController.js";
import * as registerController from "./controllers/registerController.js";
import * as loginController from "./controllers/loginController.js";
import * as logoutController from "./controllers/logoutController.js";
import * as applicationController from "./controllers/applicationController.js";
import * as terminationController from "./controllers/terminationController.js";
import * as paymentController from "./controllers/paymentController.js";
import * as servicesController from "./controllers/servicesController.js";
import * as maintenanceController from "./controllers/maintenanceController.js";

import * as admin_applicationController from "./controllers/admin_applicationController.js";
import * as admin_depositController from "./controllers/admin_depositController.js";
import * as admin_monthlyPaidController from "./controllers/admin_monthlyPaidController.js";
import * as admin_terminationController from "./controllers/admin_terminationController.js";
import * as admin_maintenanceController from "./controllers/admin_maintenanceController.js";

const router = new Router();

// Handle mainpage
router.get("/", mainController.showMain);

// Handle apartments
router.get("/apartments", apartmentsController.showApartments);

// Handle services
router.get("/services", servicesController.showServices);

//--------------------------------------------USER-------------------------------------------------
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
router.post("/payment/monthly-paid/:mID", paymentController.payMonthlyPaid);

// Handle maintenance
router.get("/maintenance", maintenanceController.displayListMaintenance);
router.post("/maintenance", maintenanceController.submitRequestMaintenance);

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
router.post("/admin-termination/monthly-paid/:mID", admin_terminationController.terminateMonthlyPaid);

// Handle MAINTENANCE CHECKS for ADMIN
router.get("/admin-maintenance", admin_maintenanceController.showMaintenanceRequest);
router.post("/admin-maintenance", admin_maintenanceController.searchMaintenanceStatus);
router.get("/admin-maintenance/:MID", admin_maintenanceController.showMaintenanceRequestUser);
router.post("/admin-maintenance/:MID", admin_maintenanceController.updateMaintenanceStatus);

export { router };
