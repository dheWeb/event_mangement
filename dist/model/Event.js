"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const Booking_1 = require("./Booking");
let Event = class Event extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.important_links = [];
        this.event_banner = "dummy.png";
    }
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "event_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "starting_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "ending_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "event_organizer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "event_host", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "event_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "important_links", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "event_pricing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "event_banner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "booking_information", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, booking => booking.event),
    __metadata("design:type", Array)
], Event.prototype, "bookings", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
