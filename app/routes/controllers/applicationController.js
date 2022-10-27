import * as applicationService from "../../services/applicationService.js";
import { validasaur } from "../../deps.js";

const validationRules_application = {
  date_rent: [validasaur.required, validasaur.isDate],
  type_apartment: [validasaur.required, validasaur.minLength(4)],
};

const submitApplication = async ({ request, response, render, user }) => {
  const body = request.body({ type: "form" });
  const form_value = await body.value;

  //   console.log(apartmentID[0].type);

  const apartmentData = {
    date_rent: form_value.get("date_rent"),
    type_apartment: form_value.get("type_apartment"),
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
    response.redirect("/auth/login");
  }
};

const showApplicationForm = async ({ render, user }) => {
  render("application.eta", {
    check_application: await applicationService.userApplication(user.id),
  });
};

export { showApplicationForm, submitApplication };
