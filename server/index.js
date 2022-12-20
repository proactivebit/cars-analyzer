import cors from "cors";
import express from "express";
import { carsService } from "./carsService.js";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const cars = await carsService.getCars();
  res.json(cars);
});

app.listen(8081, () => {
  console.log("server is listening on port 8081");
});
