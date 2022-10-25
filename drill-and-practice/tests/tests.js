import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { assertNotEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import * as userService from "../../services/userService.js";
import * as questionService from "../../services/QuestionService.js";
import { app } from "../app.js";

// Test 1 
Deno.test({
    name: "Password is bcrypted before uploading to database",
    fn: async () => {
        let passAdmin = await userService.findUserByEmail('admin@admin.com').password;
        assertNotEquals(passAdmin, "123456");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 2
Deno.test({
    name: "Successfully Login can access /topic",
    fn: async () => {
    const loginTest = await superoak(app);
    await loginTest.post("/auth/login")
        .send("email=admin@admin.com & password=123456")
        .expect("location", "/topics");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 3
Deno.test({
    name: "Authenticated user can access restricted /topics or /quiz",
    fn: async () => {
        let test = await superoak(app);
        let result = await test
            .post("/auth/login")
            .send("email=thao.khuu@gmail.com & password=123456")
            .expect("location", "/topics")
            .expect(302);

        const headers = result.headers["set-cookie"];
        const cookie = headers.split(";")[0];

        const user = await superoak(app);
        await user
            .get("/topics")
            .set("Cookie", cookie)
            .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 4
Deno.test({
    name: "Non-authenticated user GET request to '/', return 200",
    async fn() {
        const user = await superoak(app);
        await user.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 5
Deno.test({
    name: "Non-authenticated users cannot see page /quiz, then redirected to the login page",
    fn: async () => {
        let user = await superoak(app);
        await user
            .get("/quiz")
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 6
Deno.test({
    name: "Only authenticated user (admin) can add new topic",
    fn: async () => {
        let admin = await superoak(app);
        let data = await admin
            .post("/auth/login")
            .send("email=admin@admin.com & password=123456")
            .expect(302);
            
        const headers = data.headers["set-cookie"];
        const cookie = headers.split(";")[0];

        admin = await superoak(app);
        await admin.post("/topics")
            .send("name=Gone With The Wind")
            .set("Cookie", cookie)
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 7
Deno.test({
    name: "Return a random API",
    fn: async () => {
    let api = await superoak(app);
    await api
        .get("/api/questions/random")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 8
Deno.test({
    name: "Normal users are not allowed to remove topics",
    fn: async () => {
        let user = await superoak(app);
        let result = await user
            .post("/auth/login")
            .send("email=thy.khuu@gmail.com & password=123456")
            .expect(302);
            
        const headers = result.headers["set-cookie"];
        const cookie = headers.split(";")[0];

        user = await superoak(app);
        await testClient.post("/topics/5/delete")
            .set("Cookie", cookie)
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 9
Deno.test({
    name: "Any authenticated user can delete question",
    fn: async () => {
    let user = await superoak(app);
    let result = await user
        .post("/auth/login")
        .send("email=thy.khuu@gmail.com & password=123456")
        .expect("location", "/topics")
        .expect(302);

    const headers = result.headers["set-cookie"];
    const cookie = headers.split(";")[0];

    user = await superoak(app);
    await user
        .post("/topics/5/questions/10/delete")
        .set("Cookie", cookie)
        .expect("location", "/topics/5");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test 10
Deno.test({
    name: "Returns '{}' when no questions available",
    async fn() {
      const res = await questionService.listAvailableQuestions(0);
      assertEquals(res, '{}');
    },
    sanitizeResources: false,
    sanitizeOps: false,
});