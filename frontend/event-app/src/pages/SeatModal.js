import React, { useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import axios from "axios";


const SeatModal = ({
  open,
  onClose,
  selectedEvent,
  setRefresh,
  setBookingStatus,
}) => {
  const [seatsToBook, setSeatsToBook] = useState(0);

  const handleBookSeat = async () => {
    const eventId = selectedEvent._id;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/events/book",
        { eventId, seatsToBook }
      );

      if (data.message === "Booking successful!") {
        setBookingStatus(data.message);
      } else {
        setBookingStatus(data.error);
      }
    } catch (err) {
      setBookingStatus(err.response?.data?.error || "Error booking seats.");
    }
    setRefresh((prev) => !prev);
    onClose();
  };
  return (
    <div>
      <Container>
        <Modal title={selectedEvent.eventName} open={open} onCancel={onClose}>
          <input
            type="number"
            name="seatcount"
            placeholder="Enter Seats"
            onChange={(e) => setSeatsToBook(e.target.value)}
          />
          <button onClick={handleBookSeat}>Book seat</button>
        </Modal>
      </Container>
    </div>
  );
};

const Container = styled.div`
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
`;
export default SeatModal;
