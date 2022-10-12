import { app } from "../app.js";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";

Deno.test({
    name: "Unauthenticated GET '/topics' should return 302 and redirect to login",
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/topics");
        assertEquals(response.status, 302);
        assertEquals(response.redirect, true);
        assertEquals(response.text, "Redirecting to /auth/login.");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Unauthenticated GET '/quiz' should return 302 and redirect to login",
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/quiz");
        assertEquals(response.status, 302);
        assertEquals(response.redirect, true);
        assertEquals(response.text, "Redirecting to /auth/login.");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Unauthenticated GET '/' should return 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Unauthenticated GET '/auth/login' should return 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/login").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Unauthenticated GET '/auth/register' should return 200",
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/auth/register").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET '/auth/logout' redirects to '/'",
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/auth/logout");
        assertEquals(response.status, 302);
        assertEquals(response.redirect, true);
        assertEquals(response.text, "Redirecting to /.");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});