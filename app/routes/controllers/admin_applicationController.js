import * as admin_applicationService from "../../services/admin_applicationService.js";

const showApplicationList = async ({ request, response, render, user }) => {
  const table1 = await admin_applicationService.displayListUserInfo();
  var table2 = [];
  for (var i = 0; i < table1.length; i++) {
    table2.push(await admin_applicationService.displayListRoom(table1[i].firstname, table1[i].gender));
  }
  render("admin_application.eta", {
    table1: table1,
    table2: table2,
  });
};

const reserveRoom = async ({ request, response, render, user }) => {
  userID, roomID, dateStart, duedateDeposit
  await admin_applicationService.reserveRoom(userID, roomID, dateStart, duedateDeposit);
};

export { showApplicationList, reserveRoom };
