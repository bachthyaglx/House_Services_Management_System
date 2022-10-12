import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { app } from "../../app.js";


Deno.test({
    name: "Only admins can add new topics",
    fn: async () => {
        let testClient = await superoak(app);
        let res = await testClient
            .post("/auth/login")
            .send("email=admin@admin.com&password=123456")
            .expect(302);
            
        const headers = res.headers["set-cookie"];
        const cookie = headers.split(";")[0];

        testClient = await superoak(app);
        await testClient.post("/topics")
            .send("name=admintest")
            .set("Cookie", cookie)
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "non-admin users can't delete topics",
    fn: async () => {
        let testClient = await superoak(app);
        let res = await testClient
            .post("/auth/login")
            .send("email=iida@moi.fi&password=salasana")
            .expect(302);
            
        const headers = res.headers["set-cookie"];
        const cookie = headers.split(";")[0];

        testClient = await superoak(app);
        await testClient.post("/topics/1/delete")
            .set("Cookie", cookie)
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

