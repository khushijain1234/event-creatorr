import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
