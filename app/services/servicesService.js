import { executeQuery } from "../database/database.js";

const listCategory = async () => {
  const category = await executeQuery(
    `SELECT distinct(category) FROM services ORDER BY category ASC;`,
  );
  return category.rows;
};

const showItemsInCategory = async (input) => {
  const items_in_category = await executeQuery(
    `SELECT * FROM services WHERE category=$t;`,
    { t: input },
  );
  return items_in_category.rows;
};

const countItemsInCategory = async (text) => {
  const items_in_category = await executeQuery(
    `SELECT count(distinct(type_request))+1 as count FROM services WHERE category=$n;`,
    { n: text },
  );
  return items_in_category.rows;
};

export { countItemsInCategory, listCategory, showItemsInCategory };
