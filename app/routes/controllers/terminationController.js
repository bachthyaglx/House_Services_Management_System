import * as terminationService from "../../services/terminationService.js";

const deleteApplication = async ({ response, user }) => {
  await terminationService.deleteApplication(user.id);
  response.redirect("/auth/termination/application");
};

const deleteRents = async ({ user }) => {
  await terminationService.deleteRents(user.id);
  response.redirect("/auth/termination/rent");
};

const showTerminationApplication = async ({ render, user }) => {
  render("termination_application.eta", {
    check_application: await terminationService.checkTerminationApplication(user.id),
    check_rent: await terminationService.checkTerminationRent(user.id),
  });
};

const showTerminationRent= async ({ render, user }) => {
  render("termination_rent.eta", {
    check_rent: await terminationService.checkTerminationRent(user.id),
    check_allMonthlyPaid: await terminationService.check_notMonthlyPaid(user.id),
  });
};

export { deleteApplication, deleteRents, showTerminationApplication, showTerminationRent };
