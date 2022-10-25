import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";

const validationRules_application = {
  date_rent: [validasaur.required, validasaur.isDate],
  type_apartment: [validasaur.required, validasaur.minLength(4)],
};

const submitApplication = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const apartmentData = {
    date_rent: params.get("date_rent"),
    type_apartment: params.get("type_apartment"),
  };

  const [passes, errors] = await validasaur.validate(userData, validationRules_application);

  if (!passes) {
    userData.regErrors = errors;
    render("application.eta", userData);
  } else {
    await userService.addUser(params.get("firstname"), params.get("lastname"), params.get("birthdate"), params.get("gender"), params.get("email"), await bcrypt.hash(params.get("password")));
    response.redirect("/auth/login");
  }
};

const showApplication= ({ render }) => {
  render("application.eta");
};

export { submitApplication, showApplication };