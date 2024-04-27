
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./User";
import { Event } from "./Event";


@Entity()
export class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.bookings)
    user!: User;

    @ManyToOne(() => Event, event => event.bookings )
    event!: Event ;
    @Column({ type: "date" })
    booking_date!: string ;

    @Column({ type: "int" })
    quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_price!: number;

    
}
