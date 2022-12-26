import axios from "axios";

const dictUrl = "https://api.cepik.gov.pl/slowniki/";

class DictionariesService {
  async getDictionary(name) {
    const response = await axios.get(`${dictUrl}${name}`);
    return response.data.data.attributes["dostepne-rekordy-slownika"];
  }
}

export const dictionariesService = new DictionariesService();
