import cors from "cors";
import express from "express";
import { CarsAnalyzer } from "./carsAnalyzer.js";
import { carsService } from "./carsService.js";
import { dictionariesService } from "./dictionariesService.js";

const app = express();
app.use(cors());

app.get("/api/getCars", async (req, res) => {
  const province = req.query.province;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const cars = await carsService.getCars(province, startDate, endDate);
  const report = new CarsAnalyzer(cars).getReport();
  res.json(report);
});

app.get("/api/getDictionary/:name", async (req, res) => {
  const dict = await dictionariesService.getDictionary(req.params.name);
  res.json(dict);
});

app.listen(8081, () => {
  console.log("server is listening on port 8081");
});
