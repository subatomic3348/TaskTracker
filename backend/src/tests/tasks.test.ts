import request from "supertest";
import app from "../app";

async function createUserAndLogin() {
  const email = `task${Date.now()}@test.com`;


  await request(app)
    .post("/api/auth/signup")
    .send({
      name: "Test",
      email,
      password: "123456",
    });

 
  const res = await request(app)
    .post("/api/auth/signin")
    .send({
      email,
      password: "123456",
    });
  return res.body.token;
}

describe("Tasks", () => {
  it("should reject access without token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(401);
  });

  it("should create a task", async () => {
    const token = await createUserAndLogin();

    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "First task",
        description: "Testing",
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("First task");
  });

  it("should fetch user tasks", async () => {
    const token = await createUserAndLogin();

    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task A",
      });

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should update a task", async () => {
    const token = await createUserAndLogin();

    const created = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Old" });

    const id = created.body._id;

    const updated = await request(app)
      .put(`/api/tasks/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New" });

    expect(updated.status).toBe(200);
    expect(updated.body.title).toBe("New");
  });

  it("should delete a task", async () => {
    const token = await createUserAndLogin();

    const created = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Delete me" });

    const id = created.body._id;

    const res = await request(app)
      .delete(`/api/tasks/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
