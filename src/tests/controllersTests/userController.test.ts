import request from "supertest";
import app from "../../app";
import listen from "../../server";

let userId: number;

const newUser = {
  username: "Alaa yahia user",
  email: "alaaaaa@mail.com",
  password: "123rty@",
};

describe("User Controller", () => {
  console.log(">>>>>>>>>>>>user controller>>>>>>>>>>>>", process.env.NODE_ENV);

  beforeAll(async () => {
    if (userId) {
      await request(app).delete("/api/users/" + userId.toString());
    }
  });
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
