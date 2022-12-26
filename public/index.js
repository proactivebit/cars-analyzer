import { apiService } from "./apiService.js";
import { carsService } from "./carsService.js";

let selectedProvince = null;

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

function loadOnStart() {
  loadProvinces();
}

window.getData = () => {
  console.log("test");
  carsService.getCars();
};

function highlightSelectedProvince() {
  const provinces = document.getElementById("provinces").childNodes;
  provinces.forEach((element) => {
    element.removeAttribute("active");
    if (selectedProvince === element.getAttribute("id")) {
      element.setAttribute("active", true);
    }
  });
}

function selectProvince(event) {
  selectedProvince = event.target.id;
  highlightSelectedProvince();
}

(() => {
  loadOnStart();
})();
