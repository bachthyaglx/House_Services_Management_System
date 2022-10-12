import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { app } from "../../app.js";

Deno.test({
    name: "non-authenticated users can't see the quiz page and are redirected to the login page",
    fn: async () => {
        let response = await superoak(app);
        await response
            .get("/quiz")
            .expect("location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});