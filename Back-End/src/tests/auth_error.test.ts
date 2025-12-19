import request from "supertest";
import { app } from "../app";
import { User } from "../models/User";

describe("Testes de Cobertura - Auth & User Controller", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await request(app).post("/api/users/register").send({
      name: "Teste Coverage",
      email: "cover@teste.com",
      password: "123",
    });
  });

  it("Erro 409: Não deve registrar usuário com email duplicado", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Outro Nome",
      email: "cover@teste.com",
      password: "456",
    });


    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  it("Erro 400 ou 500: Não deve registrar usuário faltando campos", async () => {
    const res = await request(app).post("/api/users/register").send({
      email: "incompleto@teste.com",

    });

    expect([400, 500]).toContain(res.status);
  });

  it("Erro 401: Não deve logar com senha incorreta", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "cover@teste.com",
      password: "senha_errada",
    });
    expect([401, 400]).toContain(res.status);
  });
});
