import cors from "cors";
import express from "express";
import { carsService } from "./carsService.js";
import { dictionariesService } from "./dictionariesService.js";

const app = express();
app.use(cors());

app.get("/api/getCars", async (req, res) => {
  const cars = await carsService.getCars();
  res.json(cars);
});

app.get("/api/getDictionary/:name", async (req, res) => {
  const dict = await dictionariesService.getDictionary(req.params.name);
  res.json(dict);
});

app.listen(8081, () => {
  console.log("server is listening on port 8081");
});
