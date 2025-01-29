import { Router } from "express";
import { bookSeats, createEvent, getAllEvents, getEvent } from "../controllers/eventsController.js";
 const router = Router();

router.post("/events", createEvent);
router.get("/allEvents", getAllEvents);
router.post("/events/book" , bookSeats);
router.get("/event", getEvent);

export default router