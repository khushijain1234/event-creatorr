import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SeatModal from "./SeatModal";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDisplay from "./EventDisplay";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [showEventDisplay, setShowEventDisplay] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/allEvents").then((response) => {
      setEvents(response.data);
    });
  }, [refresh]);
  useEffect(() => {
    if (bookingStatus) {
      if (bookingStatus === "Booking successful!") {
        toast(bookingStatus);
      } else {
        toast.error(bookingStatus);
      }
    }
  }, [bookingStatus]);
  function handleSeatBooking(event) {
    setShowSeatModal(true);
    setSelectedEvent(event);
  }

  function handleShowEventDsplay(event){
    setSelectedEvent(event);
    setShowEventDisplay(true);
  }
  return (
    <>
      <Container>
        <div className="events">
          {events &&
            events.length > 0 &&
            events.map((event, index) => {
              return (
                <div className="event">
                  <div className="eventName">
                    <h3>{event.eventName}</h3>
                  </div>
                  <h4>{moment(event.data).format("DD-MM-YYYY")}</h4>
                  <div className="seatsAvailable">
                    <h4>Total Seats:- {event.totalSeats}</h4>
                    <h4>Booked Seats:- {event.bookedSeats}</h4>
                  </div>
                  <div className="seats-booking">
                    <button onClick={() => handleSeatBooking(event)}>
                      Book Seats
                    </button>
                  </div>
                  {/* <button onClick={()=>handleShowEventDsplay(event)}>View Event</button> */}
                </div>
              );
            })}
        </div>
        <Link to="/create-event">
          <button className="create-event-button">Create Event</button>
        </Link>
        {showEventDisplay && <EventDisplay selectedEvent={selectedEvent} onClose={()=>setShowEventDisplay(false)}/>}
        {showSeatModal && (
          <SeatModal
            open={showSeatModal}
            onClose={() => setShowSeatModal(false)}
            selectedEvent={selectedEvent}
            setRefresh={setRefresh}
            setBookingStatus={setBookingStatus}
          />
        )}
        <ToastContainer />
      </Container>
    </>
  );
}

const Container = styled.div`
 height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #080420;
  
  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .event {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .eventName {
        h3 {
          color: white;
          margin-right:3rem;
        }
      }
        .seatsAvailable{
        display:flex;
        gap:0.5rem;
        h4{
        color:white;}
        }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
    h4{
    color:white;}
   .create-event-button{
   width:12rem;
   position:absolute;
   top:2rem;
   right:2rem;
   } 
button {
    background-color:white;
    width:11rem;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  
  }
`;
