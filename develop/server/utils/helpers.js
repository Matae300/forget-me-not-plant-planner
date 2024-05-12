const dayjs = require('dayjs');


function dateObj(createdDate) {
  this.date = createdDate
}

function convertToHours(count, unit, frequency) {
  let unitInHours;
  switch (unit) {
    case "day":
      unitInHours = 24;
      break;
    case "week":
      unitInHours = 24 * 7;
      break;
    case "month":
      unitInHours = 24 * 30; // assuming 30 days per month
      break;
    default:
      console.log(unit);
      return;
  }

  return (unitInHours / frequency) * count;
}

const calculateDueDatesUntilOneYear = (count, unit, frequency) => {
  const dueDates = [];
  let endDate = dayjs().add(1, "year");

  let currentDate = dayjs();

  while (currentDate.isBefore(endDate, "day")) {
    const hoursToAdd = convertToHours(count, unit, frequency);

    let newDateObj = new dateObj(currentDate.format('M/D/YYYY'));

    dueDates.push(newDateObj);

    currentDate = currentDate.add(hoursToAdd, 'hour'); // Adding hours to current date
  }
  return dueDates;
}

module.exports = { calculateDueDatesUntilOneYear };