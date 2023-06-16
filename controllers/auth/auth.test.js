const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const { User } = require("../../models/user");
const { DB_HOST_TEST, SECRET_KEY } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test correct login data", async () => {
    const email = "test@mail.com";
    const password = "123456";

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashPassword,
      subscription: "starter",
      avatarURL: "example-avatar-url",
    });

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send({ email, password });

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body.user.email).toBe(email);
    expect(body.user.subscription).toBe("starter");
    expect(typeof body.user.subscription).toBe("string");
    expect(typeof body.user.email).toBe("string");

    const { token } = body;
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.id).toBeDefined();
    expect(mongoose.Types.ObjectId.isValid(decoded.id)).toBe(true);
  });

  test("test incorrect login data", async () => {
    const email = "test@mail.com";
    const password = "123456";

    const hashPassword = await bcrypt.hash("different-password", 10);
    await User.create({
      email: "other@mail.com",
      password: hashPassword,
      subscription: "starter",
      avatarURL: "example-avatar-url",
    });

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send({ email, password });

    expect(statusCode).toBe(401);
    expect(body).toHaveProperty("message", "Email or password is wrong");
  });
});

describe("test register route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(3000);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test correct register data", async () => {
    const registerData = {
      email: "test@mail.com",
      password: "123456",
    };
    const { body, statusCode } = await request(app)
      .post("/api/users/register")
      .send(registerData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
    expect(user.subscription).toBe("starter");
    expect(typeof user.avatarURL).toBe("string");
  });
});
