import { formatMonthYear } from "./common.mjs";

let currentDate = new Date();

function updateUI() {
  document.getElementById("month-year").textContent =
    formatMonthYear(currentDate);

  renderCalendar();
}

function previousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateUI();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateUI();
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");

  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");

    cell.classList.add("day");
    cell.textContent = day;

    calendar.appendChild(cell);
  }
}

window.onload = () => {
  document.getElementById("prev-btn").onclick = previousMonth;
  document.getElementById("next-btn").onclick = nextMonth;

  updateUI();
};