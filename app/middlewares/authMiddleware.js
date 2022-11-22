const restrictedPaths = ["/application", "/termination", "/services", "/payment"];

let path = "";

const authMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (!user && restrictedPaths.some((t) =>
      context.request.url.pathname.startsWith(t)
    )
  ) {
    const name = context.request.url.pathname;
    path = name;

    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authMiddleware };
