import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Booking } from "./Booking";

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    event_name!: string;

    @Column()
    venue!: string;

    @Column()
    starting_date!: string;

    @Column()
    ending_date!: string;

    @Column()
    category!: string;

    @Column()
    event_organizer!: string;

    @Column()
    event_host!: string;

    @Column()
    event_description!: string;

    @Column({ type: "json", nullable: true })
    important_links: { link_name: string; link_url: string }[] = [];

    @Column({ type: "json", nullable: true })
    event_pricing!: { paid: boolean; number_of_tickets: number; tickets: { ticket_name: string; ticket_price_in_rs: string }[] };

    @Column()
    event_banner: string = "dummy.png";

    @Column({ type: "json", nullable: true })
    booking_information!: { booking_open: boolean; booking_start_date: string; booking_end_date: string; booking_link: string };

    @OneToMany(() => Booking, booking => booking.event)
    bookings!: Booking[] ;
 }