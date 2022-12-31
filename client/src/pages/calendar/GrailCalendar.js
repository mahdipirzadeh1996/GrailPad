import React, { Component } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import './grailCalendar.scss';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


export default class GrailCalendar extends Component {
  state = {
    events: [
      {
        start: moment.utc([2022, 1, 19]).toDate(),
        end: moment.utc([2022, 1, 19]).toDate(),
        title: "Website update",
      },
      {
        start: moment.utc([2022, 1, 20]).toDate(),
        end: moment.utc([2022, 1, 20]).toDate(),
        title: "Main-Net Launch",
      },
      {
        start: moment.utc([2022, 1, 25]).toDate(),
        end: moment.utc([2022, 1, 25]).toDate(),
        title: "First IDO Pool Announcement",
      },
      {
        start: moment.utc([2022, 1, 26]).toDate(),
        end: moment.utc([2022, 1, 26]).toDate(),
        title: "Community Event",
      },
      {
        start: moment.utc([2022, 1, 28]).toDate(),
        end: moment.utc([2022, 1, 28]).toDate(),
        title: "TGE Announcement",
      },
      {
        start: moment.utc([2022, 2, 1]).toDate(),
        end: moment.utc([2022, 2, 1]).toDate(),
        title: "IDO Pools",
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  render() {
    return (
      <div className='calendar' style={{ marginLeft: this.props.open ? '17rem' : '5vw' }}>
        <div className='header'>
          <h2>Calendar</h2>
        </div>
        <div className='calendarContain'>
          <DnDCalendar
            defaultDate={moment.utc([2022, 1, 19]).toDate()}
            defaultView="month"
            events={this.state.events}
            localizer={localizer}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            style={{ height: "100vh", borderColor: 'red' }}
            eventPropGetter={(event, start, end, isSelected) => ({
              event,
              start,
              end,
              isSelected,
              style: { backgroundColor: "green" }
            })}
          />
        </div>
      </div>
    )
  }
}