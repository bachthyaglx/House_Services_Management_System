import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  render("main.eta", {
    topics: await statisticsService.totalTopics(),
    questions: await statisticsService.totalQuestions(),
    userAnswers: await statisticsService.totalUserAnswers(),
  });
};
  
export { showMain };