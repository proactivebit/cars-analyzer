import axios from "axios";

const formatUrl = (province, startDate, endDate, page) =>
  `https://api.cepik.gov.pl/pojazdy?wojewodztwo=${province}&data-od=${startDate}&data-do=${endDate}&typ-daty=1&tylko-zarejestrowane=true&pokaz-wszystkie-pola=false&limit=500&page=${page}`;

class CarsService {
  async getCars(province, startDate, endDate) {
    let response = {
      data: [],
      meta: {
        count: 0,
      },
    };
    let page = 1;
    do {
      const path = formatUrl(province, startDate, endDate, page);
      console.log(`start fetch data ${path}`);
      const result = await axios.get(path);
      if (!Array.isArray(result.data.data)) {
        break;
      }
      response.data = [...response.data, ...result.data.data];
      response.meta = result.data.meta;
      console.log(`end fetch data ${response.data.length}`);
      page++;
    } while (response.data.length < response.meta.count);
    return response;
  }
}

export const carsService = new CarsService();
