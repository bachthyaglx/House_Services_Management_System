import * as paymentService from "../../services/paymentService.js";

const paymentAction = async ({ render, user }) => {
  const paymentDeposit = await paymentService.paymentDeposit(user.id);
  const paymentMonthlyPaid = await paymentService.paymentMonthlyPaid(user.id);

  render("payment.eta", {
    paymentDeposit: paymentDeposit,
    paymentMonthlyPaid: paymentMonthlyPaid,
  });
};

export { paymentAction };
