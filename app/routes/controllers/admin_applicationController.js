import * as admin_applicationService from "../../services/admin_applicationService.js";
import { validasaur } from "../../deps.js";

const showApplicationList = async ({ request, response, render, user }) => {
  const table1 = await admin_applicationService.displayListUserInfo();
  var table2 = [];
  for (var i = 0; i < table1.length; i++) {
    table2.push(
      await admin_applicationService.displayListRoom(
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
  const table2 = await admin_applicationService.displayListRoom(
    table1[0].firstname,
    table1[0].gender,
  );

  render("admin_approveRoom.eta", {
    table1: table1,
    table2: table2,
  });
};

const approveRoom = async ({ request, response, render, params }) => {
  const body = request.body({ type: "form" });
  const text_form = await body.value;

  const validationRule_duedateDeposit = {
    duedateDeposit: [validasaur.required, validasaur.isDate],
  };

  const userData = {
    duedateDeposit: text_form.get("duedateDeposit"),
  };

  const [passes, errors] = await validasaur.validate(
    userData,
    validationRule_duedateDeposit,
  );
  
  const table1 = await admin_applicationService.displayUserInfo(params.uID);
  
  if (!passes) {
    userData.regErrors = errors;
    render("admin_approveRoom.eta", {
      userData: userData.regErrors,
      table1: table1,
      table2: await admin_applicationService.displayListRoom(table1[0].firstname, table1[0].gender),
    });
  } else {
    await admin_applicationService.processAproval(text_form.get("userID"), text_form.get("roomID"), text_form.get("dateRent"), text_form.get("duedateDeposit"), text_form.get("gender"));
    response.redirect(`/admin-application`);
  }
};

export { approveRoom, showApplicationList, showPossibleRoom };
