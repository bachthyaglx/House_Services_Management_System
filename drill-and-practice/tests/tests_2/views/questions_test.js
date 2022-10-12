import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { app } from "../../app.js";


Deno.test({
    name: "creating a question succeeds",
    fn: async () => {
    let response = await superoak(app);
    let res = await response
        .post("/auth/login")
        .send("email=admin@admin.com&password=123456")
        .expect(302)
        .expect("location", "/topics");
    const headers = res.headers["set-cookie"];
    const cookie = headers.split(";")[0];

    response = await superoak(app);
    await response
        .post("/topics/1/questions")
        .set("Cookie", cookie)
        .send("question_text=kissa")
        .expect("location", "/topics/1")

    },
    sanitizeResources: false,
    sanitizeOps: false,
});


Deno.test({
    name: "deleting a question succeeds",
    fn: async () => {
    let response = await superoak(app);
    let res = await response
        .post("/auth/login")
        .send("email=admin@admin.com&password=123456")
        .expect(302)
        .expect("location", "/topics");
    const headers = res.headers["set-cookie"];
    const cookie = headers.split(";")[0];

    response = await superoak(app);
    await response
        .post("/topics/1/questions/1/delete")
        .set("Cookie", cookie)
        .expect("location", "/topics/1")

    },
    sanitizeResources: false,
    sanitizeOps: false,
});