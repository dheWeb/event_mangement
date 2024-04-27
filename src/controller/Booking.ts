import express, { Request, Response } from "express";
import { Event } from "../model/Event";
import { User } from "../model/User";
import { Booking } from "../model/Booking";

const router = express.Router();

router.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const { eventId, userId } = req.body; 
  
      const event = await Event.findOne(eventId);
      const user = await User.findOne(userId);
  
      if (!event || !user) {
        return res.status(404).json({ message: "Event or user not found" });
      }
  
      const booking = Booking.create({ event, user });
      await booking.save();
  
      res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  
export { router as BookingRouter };
  