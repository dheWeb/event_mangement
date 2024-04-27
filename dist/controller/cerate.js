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
exports.createEventRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Event_1 = require("../model/Event");
const router = express_1.default.Router();
exports.createEventRouter = router;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/api/events", upload.single("eventBanner"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const eventData = req.body;
        console.log(eventData);
        const eventBanner = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "dummy.png";
        const event = Event_1.Event.create(Object.assign(Object.assign({}, eventData), { event_banner: eventBanner }));
        yield event.save();
        res.status(201).json({ message: "Event created successfully", event });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}));
