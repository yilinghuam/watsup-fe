import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import moment from "moment";
import { useEffect, useState } from "react";
interface eventConfig {
  title: string;
  start: string;
}
export const GroupbuyFullCalendar = (props: { data: any }) => {
  const [event, setEvent] = useState<Array<eventConfig>>([]);
  useEffect(() => {
    let data = [...props.data];
    let formatData = data.map((elem) => {
      return {
        title: elem.Name,
        start: moment(elem.Order_date, "DD-MM-YYYY").format("YYYY-MM-DD"),
      };
    });

    setEvent(formatData);
    console.log(formatData);
  }, [props.data]);

  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      contentHeight={"auto"}
      events={event}
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
    />
  );
};
