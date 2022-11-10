import * as admin_terminationService from "../../services/admin_terminationService.js";

const showMonthlyPaidList = async ({ render }) => {
    const result = await admin_monthlyPaidService.showMonthlyPaidList();
    render("admin_monthlyPaid.eta", result);
};

const checkMonthlyPaidStatus = async ({ response, request, render }) => {
    const body = request.body({ type: "form" });
    const form_text = await body.value;
  
    if (form_text.get("monthlyPaidStatus") == "All") {
      const result1 = await admin_monthlyPaidService.showMonthlyPaidList();
      render("admin_monthlyPaid.eta", result1);
    } else {
      const result2 = await admin_monthlyPaidService.checkMonthlyPaidStatus(
        form_text.get("monthlyPaidStatus"),
      );
      render("admin_monthlyPaid.eta", result2);
    }
  };

export { showMonthlyPaidList, checkMonthlyPaidStatus };