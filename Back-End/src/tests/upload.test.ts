import request from "supertest";
import { app } from "../app";
import { upload } from "../middlewares/upload";
import path from "path";
import fs from "fs";

describe("Testes de Upload Middleware", () => {
  const filePath = path.join(__dirname, "test_temp.txt");

  beforeAll(() => {
    app.post("/test-upload-middleware", upload.single("image"), (req, res) => {
      res.status(200).json({ message: "Upload funcionou!" });
    });

    fs.writeFileSync(filePath, "Conteúdo de teste - arquivo de texto");
  });

  afterAll(() => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it("Deve processar o upload corretamente", async () => {
    const res = await request(app)
      .post("/test-upload-middleware")
      .attach("image", filePath);
    expect(res.status).toBe(200);
  });
});
