import * as admin_terminationService from "../../services/admin_terminationService.js";

const displayApplicationList = async ({ render }) => {
    const result = await admin_terminationService.displayApplicationList();
    render("admin_termination-application.eta", result);
};

const deleteApplication = async ({ response, params }) => {
  await admin_terminationService.deleteApplication(params.uID);
  response.redirect("/admin-termination/application");
};

const duedateNotPaidDeposit = async ({ render }) => {
  const result = await admin_terminationService.duedateNotPaidDeposit();
  render("admin_termination-deposit.eta", result);
};

const terminateDeposit = async ({ response, params }) => {
  await admin_terminationService.terminateDeposit(params.uID);
  response.redirect("/admin-termination/deposit");
};

const duedateNotMonthlyPaid = async ({ render }) => {
  const result = await admin_terminationService.duedateNotMonthlyPaid();
  render("admin_termination-monthly-paid.eta", result);
};

const terminateMonthlyPaid = async ({ response, params }) => {
  await admin_terminationService.terminateMonthlyPaid(params.rID);
  response.redirect("/admin-termination/monthly-paid");
};

export { displayApplicationList, deleteApplication, duedateNotPaidDeposit, terminateDeposit, duedateNotMonthlyPaid, terminateMonthlyPaid };