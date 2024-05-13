import FullCalendar from "@fullcalendar/react";
import multigrid from "@fullcalendar/multimonth";
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { QUERY_MYPLANTS } from "../../utils/queries";
import "./Calendar.css";

export default function Calendar() {
  const { loading, data } = useQuery(QUERY_MYPLANTS);
  const eventArray = [];

  const myPlants = data?.myPlants || [];

  myPlants.flatMap((plant) => {
    const wateringTask = plant?.wateringTask;
    const createdDates = wateringTask?.createdDates;
    const instructions = wateringTask?.instructions;

    return createdDates.map((date) => {
      if (date.checked) {
        return eventArray.push({
          id: date._id,
          start: dayjs(date.date).valueOf(),
          title: instructions,
          allDay: true,
        });
      } else {
        return eventArray.push({
          id: date._id,
          start: dayjs(date.date).valueOf(),
          title: instructions,
          allDay: true,
        });
      }
    });
  });

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[multigrid]}
        initialView="multiMonthYear"
        multiMonthMaxColumns={1}
        defaultAllDay={true}
        events={eventArray}
      />
    </div>
  );
}
