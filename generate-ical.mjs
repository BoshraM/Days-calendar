// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.
import fs from "fs";
import { getOccurrenceDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function getMonthIndex(name) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.indexOf(name);
}

function formatDate(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}${mm}${dd}`;
}

let ics = "";
ics += "BEGIN:VCALENDAR\n";
ics += "VERSION:2.0\n";
ics += "PRODID:-//Commemorative Days//EN\n";

for (let year = 2020; year <= 2030; year++) {
  for (const item of daysData) {
    const monthIndex = getMonthIndex(item.monthName);

    if (monthIndex === -1) continue;

    const day = getOccurrenceDate(
      year,
      monthIndex,
      item.dayName,
      item.occurrence,
    );

    if (!day) continue;

    const dateStr = formatDate(year, monthIndex, day);

    ics += "BEGIN:VEVENT\n";
    ics += `DTSTART;VALUE=DATE:${dateStr}\n`;
    ics += `DTEND;VALUE=DATE:${dateStr}\n`;
    ics += `SUMMARY:${item.name}\n`;
    ics += "END:VEVENT\n";
  }
}

ics += "END:VCALENDAR\n";

fs.writeFileSync("days.ics", ics);

console.log("days.ics created successfully");
