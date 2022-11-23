import * as admin_depositService from "../../services/admin_depositService.js";

const showDepositList = async ({ render }) => {
  render("admin_deposit.eta", {result: await admin_depositService.showDepositList()});
};

const showDepositStatus = async ({ response, request, render }) => {
  const body = request.body({ type: "form" });
  const form_text = await body.value;

  let error_mess = {
    error: "Please choose a status from the selection box!",
  };

  if (form_text.get("statusDeposit") == "") {
    render("admin_deposit.eta", {error_mess: error_mess, result: await admin_depositService.showDepositList()});
    return
  } else if (form_text.get("statusDeposit") == "All") {
    render("admin_deposit.eta", {result: await admin_depositService.showDepositList()});
    return
  } else {
    render("admin_deposit.eta", {result: await admin_depositService.checkPaidDeposit(form_text.get("statusDeposit"))});
    return
  }
};

export { showDepositList, showDepositStatus };
