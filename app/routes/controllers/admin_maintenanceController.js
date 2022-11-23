import * as admin_maintenanceService from "../../services/admin_maintenanceService.js";

const showMaintenanceRequest = async ({ render }) => {
  const showMaintenanceRequest = await admin_maintenanceService.showMaintenanceRequest();
  render("admin_maintenance.eta", {showMaintenanceRequest});
};

const searchMaintenanceStatus = async ({ response, request, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  let error_mess = {
    error: "Please choose a status from the selection box!",
  };

  if (params.get("status")=="") {
    render("admin_maintenance.eta", {error_mess: error_mess, showMaintenanceRequest: await admin_maintenanceService.showMaintenanceRequest()});
    return
  } else {
    render("admin_maintenance.eta", {showMaintenanceRequest: await admin_maintenanceService.searchMaintenanceStatus(params.get("status"))});
    return
  }
};

const showMaintenanceRequestUser = async ({ render, params }) => {
  const showMaintenanceRequestUser = await admin_maintenanceService.showMaintenanceRequestUser(params.MID);
  render("admin_approveMaintenance.eta", {showMaintenanceRequestUser});
};

const updateMaintenanceStatus = async ({ render, request, params, response }) => {
  const body = request.body({ type: "form" });
  const text = await body.value;

  await admin_maintenanceService.updateMaintenanceStatus(text.get("status_pick"), params.MID);
  response.redirect("/admin-maintenance");
};

export { showMaintenanceRequest, searchMaintenanceStatus, showMaintenanceRequestUser, updateMaintenanceStatus };
