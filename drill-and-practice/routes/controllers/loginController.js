import * as userService from "../../services/userService.js";
import * as cookie from "../../middlewares/authMiddleware.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render}) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(params.get("email"));
  if (userFromDatabase.length != 1 || !userFromDatabase) {
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(params.get("password"), user.password);

  const error_mess = {
    error: "Wrong email or/and password",
  }

  if (!passwordMatches) {
    render("login.eta", error_mess);
    return; 
  }

  await state.session.set("user", user);
  
  console.log(cookie.path);
  
  if(!cookie.path) {
    response.redirect("/home");
    return;
  } else {
    response.redirect(cookie.path);
    return;
  }
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };