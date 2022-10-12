import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";

import { assertNotEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

import { app } from "../../app.js";

import * as userService from "../../services/userService.js";


Deno.test({
    name: "Password is bcrypted",
    fn: async () => {
    let password = await userService.findUserByEmail('admin@admin.com').password;
    assertNotEquals(password, "123456");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
