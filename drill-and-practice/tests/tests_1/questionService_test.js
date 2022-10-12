import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { getRandomQuestionFromTopic } from "../services/questionService.js";

Deno.test({
    name: "getRandomQuestionFromTopic returns '{}' when no questions available",
    async fn() {
      const expected = {};
      const result = await getRandomQuestionFromTopic(0);
      assertEquals(result, expected);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});