import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules_question = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],

};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userData = {
    email: params.get("email"),
    password: params.get("password"),
  };

  const [passes, errors] = await validasaur.validate(userData, validationRules_question);

  if (!passes) {
    userData.regErrors = errors;
    render("registration.eta", userData);
  } else {
    await userService.addUser(params.get("email"), await bcrypt.hash(params.get("password")));
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };