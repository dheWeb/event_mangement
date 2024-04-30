"use strict";
// src/index.ts
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const QRpage_1 = require("../model/QRpage");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // Create API endpoint to handle form submissions
    app.post('/api/submitForm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { your_name, email, phone } = req.body;
            const formSubmission = new QRpage_1.FormSubmission();
            formSubmission.your_name = your_name;
            formSubmission.email = email;
            formSubmission.phone = phone;
            yield connection.manager.save(formSubmission);
            res.status(200).send('Form submitted successfully');
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error submitting form');
        }
    }));
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})).catch(error => console.log(error));
