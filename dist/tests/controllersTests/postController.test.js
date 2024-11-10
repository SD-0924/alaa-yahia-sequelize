"use strict";
// import request from "supertest";
// import app from "../../app";
// let postId: number;
// let userId: number;
// const newUser = {
//   username: "Alaa Yahia",
//   email: "alaayahia@mail.com",
//   password: "123qwe!",
// };
// const newPost = {
//   title: "first post",
//   content: "first post content",
// };
// const newCategory = {
//   categoryName: "Backend",
// };
// const newComment = {
//   content: "new comment",
// };
// describe("Post Controller", () => {
//   beforeAll(async () => {
//     const userResponse = await request(app).post("/api/users").send(newUser);
//     userId = userResponse.body.id;
//   });
//   afterAll(async () => {
//     await request(app).delete(`/api/users/${userId}`);
//   });
//   it("should create a new post", async () => {
//     const response = await request(app)
//       .post("/api/posts")
//       .send({ ...newPost, userId });
//     expect(response.status).toBe(201);
//     expect(response.body.title).toBe(newPost.title);
//     postId = response.body.id;
//   });
//   it("should retrieve all posts with associated users, categories, and comments", async () => {
//     const response = await request(app).get("/api/posts");
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
//   it("should retrieve a specific post by ID with associated data", async () => {
//     const response = await request(app).get(`/api/posts/${postId}`);
//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(newPost.title);
//   });
//   it("should update a post by ID", async () => {
//     const updatedPost = {
//       title: "Updated Post",
//       content: "Updated content",
//     };
//     const response = await request(app)
//       .put(`/api/posts/${postId}`)
//       .send(updatedPost);
//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(updatedPost.title);
//   });
//   it("should delete a post by ID", async () => {
//     const response = await request(app).delete(`/api/posts/${postId}`);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("Post deleted successfully");
//   });
//   it("should create a category for a post", async () => {
//     const postResponse = await request(app)
//       .post("/api/posts")
//       .send({ ...newPost, userId });
//     postId = postResponse.body.id;
//     const response = await request(app)
//       .post(`/api/posts/${postId}/categories`)
//       .send(newCategory);
//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Category added to post successfully");
//   });
//   it("should retrieve categories for a specific post", async () => {
//     const response = await request(app).get(`/api/posts/${postId}/categories`);
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
//   it("should create a comment for a post", async () => {
//     const response = await request(app)
//       .post(`/api/posts/${postId}/comments`)
//       .send({ ...newComment, userId });
//     expect(response.status).toBe(201);
//     expect(response.body.content).toBe(newComment.content);
//   });
//   it("should retrieve comments for a specific post", async () => {
//     const response = await request(app).get(`/api/posts/${postId}/comments`);
//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
// });
