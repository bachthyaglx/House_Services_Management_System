const restrictedPaths = ["/application", "/termination", "/service", "/payment"];

let path = "";

const authMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (
    !user && restrictedPaths.some((path) =>
      context.request.url.pathname.startsWith(path)
    )
  ) {
    const name = context.request.url.pathname;
    path = name;

    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authMiddleware, path };
