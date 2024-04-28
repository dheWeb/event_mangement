import express, { Request, Response } from "express";
import { Event } from "../model/Event";
import { User } from "../model/User";
import { Booking } from "../model/Booking";

const router = express.Router();


router.post("/api/bookings", async (req: Request, res: Response) => {
    try {
        const { eventId, userId, quantity, total_price } = req.body;
        const event = await Event.findOne({ where: { id: eventId } });
        const user = await User.findOne({ where: { id: userId } });
        if (!event || !user) {
            return res.status(404).json({ message: "Event or user not found" });
        }
        const quantity_Int = parseInt(quantity);
        const total_price_int = parseFloat(total_price);
        const booking_date = new Date().toLocaleString();
        const booking = Booking.create({ event, user, booking_date, quantity: quantity_Int, total_price:total_price_int });
        await booking.save();

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


  router.post("/api/bookings/get", async (req: Request, res: Response) => {
      try {
          const { userId } = req.body;
            if (!userId) {
              return res.status(400).json({ error: "userId is required" });
          }
          const bookings = await Booking.find({ where: { user: { id: userId } } });
          const  event = await Booking.find({ where: { user: { id: userId } } });
          res.status(200).json({ message: "Bookings fetched successfully", bookings });
      } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  });
  
  
export { router as BookingRouter };
  