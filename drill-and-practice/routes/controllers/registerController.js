import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules_question = {
  firstname: [validasaur.required, validasaur.minLength(2)],
  lastname: [validasaur.required, validasaur.minLength(2)],
  birthdate: [validasaur.required, validasaur.isDate],
  gender: [validasaur.required, validasaur.minLength(2)],
  securityid: [validasaur.required, validasaur.minLength(4)],
  city: [validasaur.required, validasaur.minLength(2)],
  address: [validasaur.required, validasaur.minLength(4)],
  zipcode: [validasaur.required, validasaur.minLength(4)],
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)]
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userData = {
    firstname: params.get("firstname"),
    lastname: params.get("lastname"),
    birthdate: params.get("birthdate"),
    gender: params.get("gender"),
    securityid: params.get("securityid"),
    city: params.get("city"),
    address: params.get("address"),
    zipcode: params.get("zipcode"),
    email: params.get("email"),
    password: params.get("password")
  };

  const [passes, errors] = await validasaur.validate(userData, validationRules_question);

  if (!passes) {
    userData.regErrors = errors;
    render("register.eta", userData);
  } else {
    await userService.addUser(params.get("firstname"), params.get("lastname"), params.get("birthdate"), params.get("gender"), params.get("securityid"), params.get("city"), params.get("address"), params.get("zipcode"), params.get("email"), await bcrypt.hash(params.get("password")));
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };
