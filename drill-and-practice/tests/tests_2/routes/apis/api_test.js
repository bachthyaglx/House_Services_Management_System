import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { app } from "../../../app.js";

import * as answerService from "../../../services/answerService.js";
import { executeQuery } from "../../../database/database.js";


Deno.test({
    name: "API returns a correct answer",
    fn: async () => {
    let response = await superoak(app);

    
    await executeQuery("INSERT INTO questions (id, question_text) VALUES ($1, $2);", 100, "test");
    await executeQuery("INSERT INTO question_answer_options (id, question_id, option_text, is_correct) VALUES ($1, $2, $3, $4);", 110, 100, "test", true);

    await response
        .post("/api/questions/answer")
        .send({
            "questionId": 100,
            "optionId": 110,
          })
        .expect({
            "correct": true,
        });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "random question API works",
    fn: async () => {
    let response = await superoak(app);
    let res = await response
        .get("/api/questions/random")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
