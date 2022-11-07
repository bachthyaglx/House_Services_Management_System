import * as admin_applicationService from "../../services/admin_applicationService.js";

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

const approveRoom = async ({ request, response, render, params }) => {
  const body = request.body({ type: "form" });
  const get_form = await body.value;

  const table1 = await admin_applicationService.displayUserInfo(params.uID);
  const table2 = await admin_applicationService.displayListRoom(get_form.get("firstname"), get_form.get("gender"));

  console.log(get_form.get("firstname"))
  console.log(get_form.get("gender"))
  render("admin_approveRoom.eta", {
    table1: table1,
    table2: table2,
  });
};

export { approveRoom, showApplicationList };
