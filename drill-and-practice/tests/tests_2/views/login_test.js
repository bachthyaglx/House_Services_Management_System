import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { app } from "../../app.js";

// Testing the login functionality

Deno.test({
    name: "login succeeds",
    fn: async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send("email=admin@admin.com&password=123456")
        .expect("location", "/topics");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "post request to /auth/login with correct credentials authenticates user and authenticated user can access restricted sites",
    fn: async () => {
        let response = await superoak(app);
        let res = await response
            .post("/auth/login")
            .send("email=admin@admin.com&password=123456")
            .expect(302)
            .expect("location", "/topics");
        const headers = res.headers["set-cookie"];
        const cookie = headers.split(";")[0];
        const testClient = await superoak(app);
        await testClient
            .get("/topics")
            .set("Cookie", cookie)
            .expect(200);
        
    },
    sanitizeResources: false,
    sanitizeOps: false,
});