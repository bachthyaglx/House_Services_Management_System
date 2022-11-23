import * as maintenanceService from "../../services/maintenanceService.js";

const displayListMaintenance = async ({ render, user }) => {
  const displayListMaintenance = await maintenanceService.displayListMaintenance();
  const userMaintenence = await maintenanceService.userMaintenence(user.id);
  const checkRent = await maintenanceService.checkRent(user.id);

  render("maintenance.eta", {
    checkRent: checkRent,
    displayListMaintenance: displayListMaintenance,
    userMaintenence: userMaintenence
  });
};

const submitRequestMaintenance = async ({ response, request, user }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const checkRent = await maintenanceService.checkRent(user.id);
  await maintenanceService.submitRequestMaintenance(checkRent[0].id, params.get("service"));
  response.redirect("/maintenance");
};

export { displayListMaintenance, submitRequestMaintenance };
