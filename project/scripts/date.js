// date.js
export function setupDateHandler() {
    const currentYearElement = document.getElementById("currentyear");
  
    currentYearElement.textContent = new Date().getFullYear();
  }
  