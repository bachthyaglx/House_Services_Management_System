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

// Handle register
router.get("/register", registerController.showRegistrationForm);
router.post("/register", registerController.registerUser);

//--------------------------------------------USER-------------------------------------------------
// Handle login form
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

// Handle logout form
router.get("/auth/logout", logoutController.processLogout);

// Handle application
router.get("/auth/application", applicationController.showApplicationForm);
router.post("/auth/application/submit", applicationController.submitApplication);
router.post("/auth/application/update", applicationController.updateApplication);

// Handle termination
router.get("/auth/termination/application", terminationController.showTerminationApplication);
router.post("/auth/termination/application", terminationController.deleteApplication);
router.get("/auth/termination/rent", terminationController.showTerminationRent);
router.post("/auth/termination/rent", terminationController.deleteRents);

// Handle payment
router.get("/auth/payment/deposit", paymentController.paymentDepositAction);
router.post("/auth/payment/deposit", paymentController.payDeposit);
router.get("/auth/payment/monthly-paid", paymentController.paymentMonthlyPaidAction);
router.post("/auth/payment/monthly-paid/:mID", paymentController.payMonthlyPaid);

// Handle maintenance
router.get("/auth/maintenance", maintenanceController.displayListMaintenance);
router.post("/auth/maintenance", maintenanceController.submitRequestMaintenance);

//----------------------------------------ADMIN---------------------------------------------------
// Handle APPLICATION for ADMIN
router.get("/auth/admin-application", admin_applicationController.showApplicationList);
router.get("/auth/admin-application/user/:uID", admin_applicationController.showPossibleRoom);
router.post("/auth/admin-application/user/:uID", admin_applicationController.approveRoom);

// Handle DEPOSIT CHECKS for ADMIN
router.get("/auth/admin-deposit", admin_depositController.showDepositList);
router.post("/auth/admin-deposit", admin_depositController.showDepositStatus);

// Handle MONTHLY PAID CHECKS for ADMIN
router.get("/auth/admin-monthly-paid", admin_monthlyPaidController.showMonthlyPaidList);
router.post("/auth/admin-monthly-paid", admin_monthlyPaidController.checkMonthlyPaidStatus);

// Handle TERMINATION for ADMIN
router.get("/auth/admin-termination/application", admin_terminationController.displayApplicationList);
router.post("/auth/admin-termination/application/user/:uID", admin_terminationController.deleteApplication);
router.get("/auth/admin-termination/deposit", admin_terminationController.duedateNotPaidDeposit);
router.post("/auth/admin-termination/deposit/user/:uID", admin_terminationController.terminateDeposit);
router.get("/auth/admin-termination/monthly-paid", admin_terminationController.duedateNotMonthlyPaid);
router.post("/auth/admin-termination/monthly-paid/:mID", admin_terminationController.terminateMonthlyPaid);

// Handle MAINTENANCE CHECKS for ADMIN
router.get("/auth/admin-maintenance", admin_maintenanceController.showMaintenanceRequest);
router.post("/auth/admin-maintenance", admin_maintenanceController.searchMaintenanceStatus);
router.get("/auth/admin-maintenance/:MID", admin_maintenanceController.showMaintenanceRequestUser);
router.post("/auth/admin-maintenance/:MID", admin_maintenanceController.updateMaintenanceStatus);

export { router };
