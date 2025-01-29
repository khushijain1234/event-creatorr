import { successResponse } from "../utils/index.js";
import Event from "../database/eventModel.js";

export const createEvent = async (req, res, next) => {
  try {
    const { eventName, date, totalSeats } = req.body;
    const newEvent = await Event.create({ eventName, date, totalSeats });
    return successResponse(res, "Event Created Successfully", newEvent);
  } catch (ex) {
    next(ex);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (ex) {
    next(ex);
  }
};

export const getEvent = async(req,res,next) =>{
    try {
        const { id } = req.body;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ error: 'Event not found.' });
        res.json(event);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch event details.' });
      }
}

export const bookSeats = async (req, res, next) => {
  const { eventId, seatsToBook } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found." });

    if (event.totalSeats - event.bookedSeats >= seatsToBook) {
      event.bookedSeats += Number(seatsToBook);
      await event.save();
      return successResponse(res, "Booking successful!", event.bookedSeats);
    } else {
      return errorResponse(res, "Not enough seats available.");
    }
  } catch (err) {
    return errorResponse(res, "Failed to book seats.");
  }
};
