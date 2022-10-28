import * as admin_applicationService from "../../services/admin_applicationService.js";

const showMain = async ({ request, response, render, user }) => {

  const table = await admin_applicationService.displayTable();
  render("admin_application.eta", table);
};

export { showMain };
