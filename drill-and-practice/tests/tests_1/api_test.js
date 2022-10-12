import { app } from "../app.js";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

Deno.test({
    name: "Unauthenticated GET '/api/questions/random' should return 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Unauthenticated POST '/api/questions/answer' should return 200",
    async fn() {
        const testClient = await superoak(app);
        const post = await testClient.post("/api/questions/answer")
        .send("{\"questionId\": 1, \"optionId\": 3}")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "'/api/questions/answer' returns { correct: false } when answer not true",
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.post("/api/questions/answer")
            .send("{\"questionId\": 1, \"optionId\": 3}");
        assertEquals(response.body.correct, false);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});