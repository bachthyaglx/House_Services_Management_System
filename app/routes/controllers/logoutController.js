const processLogout = async ({ response, state }) => {
  await state.session.set("user", null);
  response.redirect("/");
};

export { processLogout };
