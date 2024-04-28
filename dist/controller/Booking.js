"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const Event_1 = require("../model/Event");
const User_1 = require("../model/User");
const Booking_1 = require("../model/Booking");
const router = express_1.default.Router();
exports.BookingRouter = router;
router.post("/api/bookings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, userId, quantity, total_price } = req.body;
        const event = yield Event_1.Event.findOne({ where: { id: eventId } });
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!event || !user) {
            return res.status(404).json({ message: "Event or user not found" });
        }
        const quantity_Int = parseInt(quantity);
        const total_price_int = parseFloat(total_price);
        const booking_date = new Date().toLocaleString();
        const booking = Booking_1.Booking.create({ event, user, booking_date, quantity: quantity_Int, total_price: total_price_int });
        yield booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Server Error" });
    }
}));
router.post("/api/bookings/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }
        const bookings = yield Booking_1.Booking.find({ where: { user: { id: userId } } });
        const event = yield Booking_1.Booking.find({ where: { user: { id: userId } } });
        res.status(200).json({ message: "Bookings fetched successfully", bookings });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
