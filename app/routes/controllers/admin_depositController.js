import * as admin_depositService from "../../services/admin_depositService.js";

const showDepositList = async ({ request, response, render, user }) => {
  const body = request.body({ type: "form" });
  const form_text = await body.value;
  
  console.log(form_text.get("statusDeposit"))

  if(form_text.get("statusDeposit")=='All') {
    const result1 = await admin_depositService.showDepositList();
    render("admin_deposit.eta", result1);
  } else {
    const result2 = await admin_depositService.checkPaidDeposit(form_text.get("statusDeposit"));
    render("admin_deposit.eta", result2);    
  }
};

export { showDepositList };