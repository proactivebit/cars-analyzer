const url = "";

class CarsService {
  async getCars() {
    let response = await fetch("http://127.0.0.1:8081");
    let data = await response.text();
    console.log(data);
  }
}

export const carsService = new CarsService();
