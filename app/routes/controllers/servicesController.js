import * as servicesService from "../../services/servicesService.js";

const showServices = async ({ render }) => {
  let category = await servicesService.listCategory();
  let a = [];
  let b = [];
  
  for(let i=0; i<category.length; i++) {
    a.push(await servicesService.showItemsInCategory(category[i].category));
    b.push(await servicesService.countItemsInCategory(category[i].category));
  }

  render("services.eta", {
    listCategory: category,
    showItemsInCategory: a,
    countItemsInCategory: b
  });
};

export { showServices };
