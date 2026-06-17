import { formatMonthYear } from "./common.mjs";

let currentDate = new Date();
let commemorativeDays = [];

fetch("./days.json")
  .then((response) => response.json())
  .then((data) => {
    commemorativeDays = data;
    updateUI();
  });

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
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const monthEvents = [];

  for (const item of commemorativeDays) {
    if (item.monthName !== monthName) continue;

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const targetDay = weekdays.indexOf(item.dayName);

    const matches = [];

    for (let d = 1; d <= daysInMonth; d++) {
      if (new Date(year, month, d).getDay() === targetDay) {
        matches.push(d);
      }
    }

    let eventDate;

    if (item.occurrence === "first") eventDate = matches[0];
    if (item.occurrence === "second") eventDate = matches[1];
    if (item.occurrence === "third") eventDate = matches[2];
    if (item.occurrence === "last") eventDate = matches[matches.length - 1];

    monthEvents.push({
      date: eventDate,
      name: item.name,
    });
  }

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");

    cell.classList.add("day");

    const event = monthEvents.find((e) => e.date === day);

    if (event) {
      cell.innerHTML = `
      <div>${day}</div>
      <div>${event.name}</div>
    `;
    } else {
      cell.textContent = day;
    }

    calendar.appendChild(cell);
  }
}

window.onload = () => {
  document.getElementById("prev-btn").onclick = previousMonth;
  document.getElementById("next-btn").onclick = nextMonth;

  updateUI();
};
