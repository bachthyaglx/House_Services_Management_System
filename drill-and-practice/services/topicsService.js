import { executeQuery } from "../database/database.js";
import * as databaseConstraints from "../database/databaseConstraints.js";

const listAvailableTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics;`);

  return res.rows;
};

const listSpecificTopic = async (topicID) => {
  const res = await executeQuery(`SELECT * FROM topics WHERE id=$1;`,topicID);

  return res.rows[0];
};

const deleteTopic = async (topicID) => {
  // Drop constraints, then adding ON DELETE CASCADE
  await databaseConstraints.changeConstraints();

  // Remove topic from motherTable also remove topic from childTable
  await executeQuery(`DELETE FROM topics WHERE id=$1;`,topicID);

  // Drop constraints, then set constraints to originals
  await databaseConstraints.originalConstraints();
};

const addTopic = async (userID, topic) => {
  await executeQuery(`INSERT INTO topics (user_id, name) VALUES ($1, $2)`, userID, topic);
};
  
export { listAvailableTopics, listSpecificTopic, deleteTopic, addTopic };