import { apiService } from "./apiService.js";

let selectedProvince = null;
let selectedYear = null;
let selectedMonth = null;
let popularBrandsChart = null;
let petrolTypeChart = null;

async function loadProvinces() {
  const provincesElement = document.getElementById("provinces");
  const provinces = await apiService.getDictionary("wojewodztwa");
  provinces.forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", element["klucz-slownika"]);
    button.innerHTML = element["wartosc-slownika"];
    button.onclick = selectProvince;
    provincesElement.appendChild(button);
  });
}

function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = max - 5;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

function loadYears() {
  const yearsElement = document.getElementById("years");
  generateArrayOfYears().forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", element);
    button.innerHTML = element;
    button.onclick = selectYear;
    yearsElement.appendChild(button);
  });
}

function loadMonths() {
  const monthsElement = document.getElementById("months");
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", element - 1);
    button.innerHTML = element;
    button.onclick = selectMonth;
    monthsElement.appendChild(button);
  });
}

function getFirstDayOfMonth(year, month) {
  let date = new Date(Number(year), Number(month), 1);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0].replace(/-/g, "");
}

function getLastDayOfMonth(year, month) {
  let date = new Date(Number(year), Number(month) + 1, 0);
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0].replace(/-/g, "");
}

window.getData = async () => {
  const loaderElement = document.getElementById("loader");
  const span = document.createElement("span");
  span.innerHTML = "Pobieranie danych...";
  loaderElement.appendChild(span);
  const startDate = getFirstDayOfMonth(selectedYear, selectedMonth);
  const endDate = getLastDayOfMonth(selectedYear, selectedMonth);
  const report = await apiService.getCars(selectedProvince, startDate, endDate);
  loadAmountOfCars(report.amountOfCars);
  loadPopularBrands(report.brands);
  loadPetrolType(report.petrol);
  if (loaderElement.firstChild) {
    loaderElement.firstChild.remove();
  }
};

function loadAmountOfCars(amountOfCars) {
  const amountOfCarsElement = document.getElementById("amountOfCars");
  if (amountOfCarsElement.firstChild) {
    amountOfCarsElement.firstChild.remove();
  }
  const h1 = document.createElement("h1");
  h1.innerHTML = `Liczba zarejestrowanych samochodów: ${amountOfCars}`;
  amountOfCarsElement.appendChild(h1);
}

function highlightSelected(element, selected) {
  const elements = document.getElementById(element).childNodes;
  elements.forEach((element) => {
    element.removeAttribute("active");
    if (selected === element.getAttribute("id")) {
      element.setAttribute("active", true);
    }
  });
}

function selectProvince(event) {
  selectedProvince = event.target.id;
  highlightSelected("provinces", selectedProvince);
}

function selectYear(event) {
  selectedYear = event.target.id;
  highlightSelected("years", selectedYear);
}

function selectMonth(event) {
  selectedMonth = event.target.id;
  highlightSelected("months", selectedMonth);
}

function loadPopularBrands(brands) {
  const popularBrandsElement = document.getElementById("popularBrands");
  if (popularBrandsElement.firstChild) {
    popularBrandsElement.firstChild.remove();
  }
  if (popularBrandsChart) {
    popularBrandsChart.destroy();
  }
  const h1 = document.createElement("h1");
  h1.innerHTML = "Najpopularniejsze marki";
  popularBrandsElement.appendChild(h1);
  const ctx = document.getElementById("popularBrandsChart");
  popularBrandsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: brands.map((ele) => ele.name).slice(0, 8),
      datasets: [
        {
          label: "Marka",
          data: brands.map((ele) => ele.count).slice(0, 8),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function loadPetrolType(petrol) {
  const petrolTypeElement = document.getElementById("petrolType");
  if (petrolTypeElement.firstChild) {
    petrolTypeElement.firstChild.remove();
  }
  if (petrolTypeChart) {
    petrolTypeChart.destroy();
  }
  const h1 = document.createElement("h1");
  h1.innerHTML = "Rodzaj paliwa";
  petrolTypeElement.appendChild(h1);
  const ctx = document.getElementById("petrolTypeChart");
  petrolTypeChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: petrol.map((ele) => ele.name),
      datasets: [
        {
          label: "Rodzaj paliwa",
          data: petrol.map((ele) => ele.count),
          hoverOffset: 4,
        },
      ],
    },
  });
}

function initOnStart() {
  loadProvinces();
  loadYears();
  loadMonths();
}

(() => {
  initOnStart();
})();
