const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const app = require("../../app");
const { User } = require("../../models/user");
const { DB_HOST_TEST, SECRET_KEY } = process.env;
const { nanoid } = require("nanoid");

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
    const email = "hejeci1681@docwl.com";
    const password = "123456";

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    await User.create({
      email,
      password: hashPassword,
      subscription: "starter",
      avatarURL,
      verificationToken,
      verify: true,
    });

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send({ email, password });
    const { token } = body;


    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body.user.email).toBe(email);
    expect(body.user.subscription).toBe("starter");
    expect(typeof body.user.subscription).toBe("string");
    expect(typeof body.user.email).toBe("string");

    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.id).toBeDefined();
    expect(mongoose.Types.ObjectId.isValid(decoded.id)).toBe(true);
  });

  test("test incorrect login data", async () => {
    const email = "hejeci1681@docwl.com";
    const password = "123456";

    const hashPassword = await bcrypt.hash("different-password", 10);
    // const payload = {
    //   id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for testing
    // };
    const payload = {
      id: "64f8b35ffc0bb9fdf8f88a50",
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.create({
      email: "other@mail.com",
      password: hashPassword,
      subscription: "starter",
      avatarURL: "example-avatar-url",
      verificationToken: token,
    });

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .set("Authorization", `Bearer ${token}`)
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
      email: "123456@mail.com",
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
