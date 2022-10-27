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

  if (!passes) {
    apartmentData.regErrors = errors;
    render("application.eta", apartmentData);
  } else {
    const apartmentID = await applicationService.getApartmentID(
      form_value.get("type_apartment"),
    );
    await applicationService.submitApplication(
      user.id,
      apartmentID[0].id,
      form_value.get("date_rent"),
    );
    response.redirect("/application");
  }
};

const showApplicationForm = async ({ render, user }) => {
  render("application.eta", {
    check_profile: await userService.showUserProfile(user.id),
    check_application: await applicationService.userApplication(user.id),
    apartment_application: await applicationService.apartmentName(user.id),
  });
};

const updateApplication = async ({ request, response, user, render }) => {
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

  if (!passes) {
    apartmentData.regErrors = errors;
    render("application.eta", {
      apartmentData,
      check_profile: await userService.showUserProfile(user.id),
      check_application: await applicationService.userApplication(user.id),
      apartment_application: await applicationService.apartmentName(user.id),});
  } else {
    const apartmentID = await applicationService.getApartmentID(
      form_value.get("type_apartment"),
    );

    await applicationService.updateApplication(
      apartmentID[0].id,
      form_value.get("date_rent"),
      user.id,
    );
    response.redirect("/application");
  }
};

export { showApplicationForm, submitApplication, updateApplication };
