import "regenerator-runtime/runtime";
// Setup empty JS object to act as endpoint for all routes

const request = require("supertest");
const app = require("../src/server/server.js");

describe("Testing root path", () => {
    test("Should respond to GET method", () => {
        return request(app)
            .get("/")
            .expect(200);
    });
});