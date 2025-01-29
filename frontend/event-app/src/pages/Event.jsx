import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);

  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/events", {
        eventName,
        date,
        totalSeats,
      });
      toast(data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <FormContainer>
        <form action="" onSubmit={handleCreateEvent}>
          <div className="brand">
            <h1>Create Event</h1>
          </div>
          <input
            type="text"
            placeholder="Event Name"
            name="eventname"
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Select Date"
            name="data"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Total No. of Seats"
            name="seatcount"
            onChange={(e) => setTotalSeats(Number(e.target.value))}
            required
          />
          <button type="submit">Create Event</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  );
}

const FormContainer = styled.div`
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

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
