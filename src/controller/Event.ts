import express, { Request, Response } from "express";
import multer from "multer";
import { Event } from "../model/Event";
import { User } from "../model/User";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/events", upload.single("eventBanner"), async (req: Request, res: Response) => {
  try {
    const eventData: Event = req.body;
    console.log(eventData);
    
    const eventBanner: string  = req.file?.path || "dummy.png";
    const event = Event.create({ ...eventData, event_banner: eventBanner});
    
    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



router.get("/api/events", async (req: Request, res: Response) => {
  try {
    const allEvents = await Event.find();

    res.status(200).json({ message: "All events fetched successfully", allEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/api/events/:id", async (req: Request, res: Response ) => {
  const id = parseInt(req.params.id);
  const event = await Event.findOne({ where: { id } });
  res.status(200).json({message :" Events fetched successfully" , event} )
});


export { router as createEventRouter };