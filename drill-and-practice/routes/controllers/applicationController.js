import * as applicationService from "../../services/applicationService.js";
import { validasaur } from "../../deps.js";

const validationRules_application = {
  date_rent: [validasaur.required, validasaur.isDate],
  type_apartment: [validasaur.required, validasaur.minLength(4)],
};

const submitApplication = async ({ request, response, render, user }) => {
  const apartmentID = await applicationService.getApartmentID(form_value.type_apartment);
  console.log(apartmentID);
  // const body = request.body({ type: "form" });
  // const form_value = await body.value;

  // const apartmentData = {
  //   date_rent: form_value.get("date_rent"),
  //   type_apartment: form_value.get("type_apartment"),
  // };

  // const [passes, errors] = await validasaur.validate(apartmentData, validationRules_application);

  // if (!passes) {
  //   userData.regErrors = errors;
  //   render("application.eta", apartmentData);
  // } else {
  //   const apartmentID = await applicationService.getApartmentID(form_value.type_apartment);
  //   await applicationService.submitApplication(user.id, apartmentID, CURRENT_DATE, form_value.date_rent);
  //   response.redirect("/auth/login");
  // }
};

const showApplicationForm = ({ render }) => {
  render("application.eta");
};

export { submitApplication, showApplicationForm };
