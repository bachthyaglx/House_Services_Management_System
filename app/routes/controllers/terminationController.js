import * as terminationService from "../../services/terminationService.js";

const deleteApplication = async ({ response, user }) => {
  await terminationService.deleteApplication(user.id);
  response.redirect("/termination");
};

const deleteRents = async ({ user }) => {
  await terminationService.deleteRents(user.id);
  response.redirect("/termination");
};

const showTerminationForm = async ({ render, user }) => {
  render("termination.eta", {
    check_application: await terminationService.checkTerminationApplication(user.id),
    check_rent: await terminationService.checkTerminationRent(user.id),
  });
};

export { deleteApplication, deleteRents, showTerminationForm };
