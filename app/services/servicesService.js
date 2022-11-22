import { executeQuery } from "../database/database.js";

const listCategory = async () => {
  const category = await executeQuery(
    `SELECT distinct(category) FROM services;`,
  );
  return category.rows;
};

const showItemsInCategory = async (type) => {
  const items_in_category = await executeQuery(
    `SELECT type_request, cost FROM services WHERE category=$category;`,
    { category: type },
  );
  return items_in_category.rows;
};

const countItemsInCategory = async (type) => {
  const items_in_category = await executeQuery(
    `SELECT count(distinct(type_request)), category FROM services WHERE category=$category;`,
    { category: type },
  );
  return items_in_category.rows;
};

const fullCategory = async () => {
  const category = await executeQuery(
    `SELECT * FROM services;`,
  );
  return category.rows;
};

export { countItemsInCategory, listCategory, showItemsInCategory, fullCategory };
