import * as servicesService from "../../services/servicesService.js";

const showServices = async ({ render, request }) => {
//   const body = request.body({ type: "form" });
//   const text = await body.value;

  const category = await servicesService.fullCategory();

  render("services.eta", {
    category: category,
  });
};

export { showServices };
