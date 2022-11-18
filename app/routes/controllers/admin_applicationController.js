import * as admin_applicationService from "../../services/admin_applicationService.js";

const showApplicationList = async ({ render }) => {
  const table1 = await admin_applicationService.displayListUserInfo();
  var table2 = [];
  for (var i = 0; i < table1.length; i++) {
    table2.push(
      await admin_applicationService.suggestPossibleRoom(
        table1[i].firstname,
        table1[i].gender,
      ),
    );
  }
  render("admin_application.eta", {
    table1: table1,
    table2: table2,
  });
};

const showPossibleRoom = async ({ render, params }) => {
  const table1 = await admin_applicationService.displayUserInfo(params.uID);
  const table2 = await admin_applicationService.suggestPossibleRoom(
    table1[0].firstname,
    table1[0].gender,
  );

  let dateRent = () => {
    var dateRent = new Date(`${table1[0].date_rent}`);
    dateRent.setDate(dateRent.getDate() - 7);
    return dateRent.toLocaleDateString("en-GB");
  };
  
  render("admin_approveRoom.eta", {
    duedateDeposit: dateRent(),
    table1: table1,
    table2: table2,
  });
};

const approveRoom = async ({ request, response, params }) => {
  const body = request.body({ type: "form" });
  const text_form = await body.value;

  const table1 = await admin_applicationService.displayUserInfo(params.uID);
  
  let format_depositDate = () => {
    var form_date = text_form.get("duedateDeposit").split('/');
    return `${form_date[2]}-${form_date[1]}-${form_date[0]}`;
  };
  
  await admin_applicationService.processAproval(
    text_form.get("userID"),
    text_form.get("roomID"),
    table1[0].date_rent,
    format_depositDate(),
    text_form.get("gender"),
  );
  response.redirect(`/admin-application`);
};

export { approveRoom, showApplicationList, showPossibleRoom };
