import * as userService from "../../services/userService.js";
import * as cookie from "../../middlewares/authMiddleware.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const error_mess1 = {
    error: "Wrong email and/or password",
  };

  const error_mess2 = {
    error: "Please enter email and password",
  };

  const userFromDatabase = await userService.findUserByEmail(params.get("email"));
  if (userFromDatabase.length != 1 || !userFromDatabase) {
    render("login.eta", error_mess2);
    return;
  }

  const user = userFromDatabase[0];
  await state.session.set("user", user);

  const passwordMatches = await bcrypt.compare(params.get("password"), user.password);

  if (!passwordMatches) {
    render("login.eta", error_mess1);
    return;
  } 

  // console.log(cookie.path);

  if (!cookie.path && user.email=="admin@admin.com") {
    response.redirect("/auth/admin-application");
  } else if (!cookie.path && user.email!="admin@admin.com") {
    response.redirect("/");
  } else {
    response.redirect(cookie.path);
  }
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };
