import request from "supertest";
import app from "../app";

describe("Auth", () => {
  it("should signup a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test",
        email: "test@gmail.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login the user", async () => {
    // create user first (test isolation)
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test",
        email: "test@gmail.com",
        password: "123456",
      });

    // now login
    const res = await request(app)
      .post("/api/auth/signin")
      .send({
        email: "test@gmail.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
