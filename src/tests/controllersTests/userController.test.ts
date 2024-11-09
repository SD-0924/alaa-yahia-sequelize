// tests/controllers/userController.test.ts

import request from "supertest";
import app from "../../app";

let userId: number;

const newUser = {
  username: "Jane Doe",
  email: "jane@example.com",
  password: "password123",
};

describe("User Controller", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(newUser.username);
    userId = response.body.id;
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should update the user by id", async () => {
    const response = await request(app).put("/api/users/" + userId.toString());
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
  });

  it("should get the user by id", async () => {
    const response = await request(app).get("/api/users/" + userId.toString());
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(newUser.username);
  });

  it("should delete the user by id", async () => {
    const response = await request(app).delete(
      "/api/users/" + userId.toString()
    );
    expect(response.status).toBe(200);
  });
});
