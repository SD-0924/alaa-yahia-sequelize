import request from "supertest";
import app from "../../app"; // Assuming you need to keep this to use app routes
const users = require("../../controllers/userController");

jest.mock("../../controllers/userController"); // Mocking the controller

let userId: number;

const newUser = {
  username: "Alaa yahia user",
  email: "alaaaaa@mail.com",
  password: "123rty@",
};

describe("User Controller (Mocked)", () => {
  beforeAll(() => {
    // Clear mock data if necessary
    jest.clearAllMocks();
  });

  it("should mock the creation of a new user", (done) => {
    const mockUser = { id: 1, ...newUser };
    (users.createUser as jest.Mock).mockResolvedValue(mockUser);

    request(app)
      .post("/api/users")
      .send(newUser)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(newUser.username);
        userId = response.body.id;
        done(); // Call done() after assertions
      })
      .catch((error) => done(error)); // Pass errors to done() to handle failures
  });

  it("should mock getting all users", (done) => {
    const mockUsers = [newUser];
    (users.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    request(app)
      .get("/api/users")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        done();
      })
      .catch((error) => done(error));
  });

  it("should mock updating the user by id", (done) => {
    const updatedUser = { ...newUser, username: "Updated Name" };
    (users.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    request(app)
      .put(`/api/users/${userId}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(updatedUser.username);
        done();
      })
      .catch((error) => done(error));
  });

  it("should mock getting the user by id", (done) => {
    (users.getUserById as jest.Mock).mockResolvedValue(newUser);

    request(app)
      .get(`/api/users/${userId}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(newUser.username);
        done();
      })
      .catch((error) => done(error));
  });

  it("should mock deleting the user by id", (done) => {
    (users.deleteUser as jest.Mock).mockResolvedValue({
      message: "User deleted",
    });

    request(app)
      .delete(`/api/users/${userId}`)
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((error) => done(error));
  });
});
