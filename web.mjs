import { formatMonthYear } from "./common.mjs";

let currentDate = new Date();

function updateUI() {
  document.getElementById("month-year").textContent =
    formatMonthYear(currentDate);
    document.getElementById("month-select").value =
    currentDate.getMonth();

    document.getElementById("year-select").value =
    currentDate.getFullYear();

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

function populateSelectors() {
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

function jumpToDate() {
  const month = Number(
    document.getElementById("month-select").value
  );

  const year = Number(
    document.getElementById("year-select").value
  );

  currentDate = new Date(year, month, 1);

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
  populateSelectors();

	document.getElementById("month-select")
	.addEventListener("change", jumpToDate);

	document.getElementById("year-select")
	.addEventListener("change", jumpToDate);

  updateUI();
};