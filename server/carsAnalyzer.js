export class CarsAnalyzer {
  constructor(data) {
    this.data = data;
  }

  getAmountOfCars() {
    return this.data.meta.count;
  }

  getBrands() {
    let brands = [];
    const brandsTmp = {};
    for (const element of this.data.data) {
      const brand = element.attributes.marka;
      if (brandsTmp[brand]) {
        brandsTmp[brand].count++;
      } else {
        brandsTmp[brand] = {
          name: brand,
          count: 1,
        };
      }
    }
    brands = Object.values(brandsTmp).sort((a, b) => {
      return b.count - a.count;
    });
    return brands;
  }

  getTypeOfPetrol() {
    const petrolType = {};
    for (const element of this.data.data) {
      const petrol = element.attributes["rodzaj-paliwa"];
      if (petrolType[petrol]) {
        petrolType[petrol].count++;
      } else {
        petrolType[petrol] = {
          name: petrol,
          count: 1,
        };
      }
    }
    return Object.values(petrolType);
  }

  getReport() {
    return {
      amountOfCars: this.getAmountOfCars(),
      brands: this.getBrands(),
      petrol: this.getTypeOfPetrol(),
    };
  }
}
