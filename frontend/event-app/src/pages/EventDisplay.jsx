import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios';


export default function EventDisplay({selectedEvent,onClose}){
    const [eventData, setEventData] = useState(null);

    useEffect(()=>{
        if(selectedEvent){
            const id=selectedEvent._id;
        axios.get(`http://localhost:5000/api/event`,{id}).then((response) => {
        setEventData(response.data);
        })
        }
    },[])
console.log(selectedEvent,eventData,"kkkk")
  return (
    <Container>
        <div>
            <div>
                <h3>Event Name:- ${eventData.eventName}</h3>
                <h4>Date:- ${eventData.date}</h4>
                <h4>Total Seats:- ${eventData.totalSeats}</h4>
                <h4>Booked Seats:- ${eventData.bookedSeats}</h4>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h1 {
    color: white;
  }

  

`;
