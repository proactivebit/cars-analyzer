import axios from "axios";

const url =
  "https://api.cepik.gov.pl/pojazdy?wojewodztwo=12&data-od=20220101&data-do=20221101&typ-daty=2&tylko-zarejestrowane=true&pokaz-wszystkie-pola=false&limit=100&page=1";

class CarsService {
  async getCars() {
    const response = await axios.get(url);
    return response.data;
  }
}

export const carsService = new CarsService();
