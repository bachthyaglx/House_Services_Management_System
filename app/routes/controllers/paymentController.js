import * as paymentService from "../../services/paymentService.js";

const paymentDepositAction = async ({ render, user }) => {
  const payment_deposit = await paymentService.paymentDeposit(user.id);
  const payment_monthlyPaid = await paymentService.paymentMonthlyPaid(user.id);

  render("payment-deposit.eta", {
    paymentDeposit: payment_deposit,
    paymentMonthlyPaid: payment_monthlyPaid,
    currentMonth: new Date().getMonth(),
  });
};

const paymentMonthlyPaidAction = async ({ render, user }) => {
  const payment_deposit = await paymentService.paymentDeposit(user.id);
  const payment_monthlyPaid = await paymentService.paymentMonthlyPaid(user.id);

  render("payment-monthly-paid.eta", {
    paymentDeposit: payment_deposit,
    paymentMonthlyPaid: payment_monthlyPaid,
    currentMonth: new Date().getMonth(),
  });
};

const payDeposit = async ({ user, response }) => {
  await paymentService.payDeposit(user.id);
  response.redirect("/payment/deposit");
};

const payMonthlyPaid = async({ user, response }) => {
  await paymentService.payMonthlyPaid(user.id);
  response.redirect("/payment/monthly-paid");
};

export { paymentDepositAction, paymentMonthlyPaidAction, payDeposit, payMonthlyPaid };
