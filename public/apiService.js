const path = "http://127.0.0.1:8081/api";

class ApiService {
  async getDictionary(name) {
    const response = await fetch(`${path}/getDictionary/${name}`);
    return await response.json();
    // return [
    //   {
    //     "klucz-slownika": "02",
    //     "wartosc-slownika": "DOLNOŚLĄSKIE",
    //     "liczba-wystapien": 3406698,
    //   },
    //   {
    //     "klucz-slownika": "04",
    //     "wartosc-slownika": "KUJAWSKO-POMORSKIE",
    //     "liczba-wystapien": 2525191,
    //   },
    //   {
    //     "klucz-slownika": "06",
    //     "wartosc-slownika": "LUBELSKIE",
    //     "liczba-wystapien": 2906371,
    //   },
    // ];
  }
}

export const apiService = new ApiService();
