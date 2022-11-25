import * as paymentService from "../../services/paymentService.js";

const paymentDepositAction = async ({ render, user }) => {
  const payment_deposit = await paymentService.paymentDeposit(user.id);

  render("payment-deposit.eta", {
    paymentDeposit: payment_deposit,
    currentMonth: new Date().getMonth(),
  });
};

const payDeposit = async ({ user, response }) => {
  await paymentService.payDeposit(user.id);
  response.redirect("/payment/deposit");
};

const paymentMonthlyPaidAction = async ({ render, user }) => {
  const payment_monthlyPaid = await paymentService.paymentMonthlyPaid(user.id);
  const calculate_No_Paid = await paymentService.calculate_No_Paid(user.id);

  render("payment-monthly-paid.eta", {
    calculate_No_Paid: calculate_No_Paid,
    paymentMonthlyPaid: payment_monthlyPaid,
    currentMonth: new Date().getMonth(),
  });
};

const payMonthlyPaid = async({ user, response, params }) => {

  await paymentService.payMonthlyPaid(user.id, params.mID);
  response.redirect("/auth/payment/monthly-paid");
};

export { paymentDepositAction, paymentMonthlyPaidAction, payDeposit, payMonthlyPaid };
