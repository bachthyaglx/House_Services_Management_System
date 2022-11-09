import * as admin_depositService from "../../services/admin_depositService.js";

const showDepositList = async ({ render }) => {
  const result1 = await admin_depositService.showDepositList();
  render("admin_deposit.eta", result1);
};

const showDepositStatus = async ({ response, request, render }) => {
  const body = request.body({ type: "form" });
  const form_text = await body.value;

  if (form_text.get("statusDeposit") == "All") {
    const result1 = await admin_depositService.showDepositList();
    render("admin_deposit.eta", result1);
  } else {
    const result2 = await admin_depositService.checkPaidDeposit(
      form_text.get("statusDeposit"),
    );
    render("admin_deposit.eta", result2);
  }
};

export { showDepositList, showDepositStatus };
