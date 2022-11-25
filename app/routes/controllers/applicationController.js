import * as applicationService from "../../services/applicationService.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const submitApplication = async ({ request, response, render, user }) => {
  const body = request.body({ type: "form" });
  const form_value = await body.value;

  const apartmentData = {
    date_rent: form_value.get("date_rent"),
    type_apartment: form_value.get("type_apartment"),
  };

  const validationRules_application = {
    date_rent: [validasaur.required, validasaur.isDate],
    type_apartment: [validasaur.required, validasaur.minLength(4)],
  };

  const [passes, errors] = await validasaur.validate(
    apartmentData,
    validationRules_application,
  );
  
  let today = new Date();
  today.setMonth(today.getMonth()+1)
  let today_convert = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  if (!passes) {
    apartmentData.regErrors = errors;
    render("application.eta", apartmentData);
  } else if (form_value.get("date_rent")<today_convert) {
    let error = "Date must be equal or greater than today";
    render("application.eta", {error});
  } else {
    const apartmentID = await applicationService.getApartmentID(form_value.get("type_apartment"));
    await applicationService.submitApplication(user.id, apartmentID[0].id, form_value.get("date_rent"));
    response.redirect("/auth/application");
  }
};

const showApplicationForm = async ({ render, user }) => {
  const dateSubmit_ob = await applicationService.userApplication(user.id);
  let t = "";

  if (dateSubmit_ob && dateSubmit_ob.length > 0) {
    //Function caltulating number of days between two dates
    let duedateModifyApplication = () => {
      var dateSubmit = new Date(`${dateSubmit_ob[0].date_request}`).getTime();
      var dateCurrent = new Date().getTime();
      var MS_PER_DAY = 1000 * 60 * 60 * 24;
      var result = (dateCurrent - dateSubmit) / MS_PER_DAY;
      return result;
    };
    t = duedateModifyApplication();
  }

  render("application.eta", {
    check_profile: await userService.showUserProfile(user.id),
    check_application: await applicationService.userApplication(user.id),
    apartment_application: await applicationService.apartmentName(user.id),
    check_rent: await applicationService.userRent(user.id),
    check_monthlyPaid: await applicationService.userMonthlyPaid(user.id),
    dateSubmitApplication: t,
  });
};

const updateApplication = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const form_value = await body.value;

  const apartmentData1 = {
    date_rent: form_value.get("date_rent"),
    type_apartment: form_value.get("type_apartment"),
  };

  const validationRules_application = {
    date_rent: [validasaur.required, validasaur.isDate],
    type_apartment: [validasaur.required, validasaur.minLength(4)],
  };

  const [passes, errors] = await validasaur.validate(
    apartmentData1,
    validationRules_application,
  );
  
  let today = new Date();
  today.setMonth(today.getMonth()+1)
  let today_convert = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  if (!passes) {
    apartmentData1.validationErrors = errors;
    render("application-update.eta", {
      error_date_check: "Date is empty or not correct",
      check_profile: await userService.showUserProfile(user.id),
      check_application: await applicationService.userApplication(user.id),
      apartment_application: await applicationService.apartmentName(user.id),
    });
  } else if (form_value.get("date_rent")<today_convert) {
    let error = "Date must be equal or greater than today";
    render("application-update.eta", { 
      error_date_check: error,
      check_profile: await userService.showUserProfile(user.id),
      check_application: await applicationService.userApplication(user.id),
      apartment_application: await applicationService.apartmentName(user.id),
    });
  } else {
    const apartmentID = await applicationService.getApartmentID(form_value.get("type_apartment"));
    await applicationService.updateApplication(apartmentID[0].id, form_value.get("date_rent"), user.id);
    response.redirect("/auth/application");
  }
};

export { showApplicationForm, submitApplication, updateApplication };
