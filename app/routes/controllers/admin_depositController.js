import * as admin_deposit from "../../services/admin_depositService.js";

const showDepositList = async ({ request, response, render, user }) => {
  render("admin_deposit.eta");
};

export {showDepositList};