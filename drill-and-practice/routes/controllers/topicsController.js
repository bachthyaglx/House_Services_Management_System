import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const validationRules_topic = {
  name: [validasaur.required, validasaur.minLength(1)]
};

const getTopic = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    name: params.get("name")
  };
};

const addTopic = async ({ request, response, render, user }) => {
  const topicData = await getTopic(request);

  const [passes, errors] = await validasaur.validate(topicData, validationRules_topic);

  if (!passes) {
    console.log(errors);
    topicData.errors = errors;
    render("topics.eta", {
      availableTopics: await topicsService.listAvailableTopics(),
      validateTopic: topicData.errors,
    });
  } else {
    await topicsService.addTopic(user.id, topicData.name);

    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response }) => {
  await topicsService.deleteTopic(params.id);

  response.redirect("/topics");
};

const listTopics = async ({ render, user }) => {
  render("topics.eta", {
    availableTopics: await topicsService.listAvailableTopics(),
    // claimedChores: await topicsService.listUserChores(user.id),
  });
};

export { listTopics, deleteTopic, addTopic };