import { carsService } from "./carsService.js";

window.getData = () => {
  console.log("test");
  carsService.getCars();
};
