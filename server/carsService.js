import axios from "axios";

const url =
  "https://api.cepik.gov.pl/pojazdy?wojewodztwo=12&data-od=20220101&data-do=20221101&typ-daty=2&tylko-zarejestrowane=true&pokaz-wszystkie-pola=false&limit=100&page=1";

class CarsService {
  async getCars(province, startDate, endDate) {
    const response = await axios.get(
      `https://api.cepik.gov.pl/pojazdy?wojewodztwo=${province}&data-od=${startDate}&data-do=${endDate}&typ-daty=1&tylko-zarejestrowane=true&pokaz-wszystkie-pola=false&limit=500&page=1`
    );
    return response.data;
  }
}

export const carsService = new CarsService();
