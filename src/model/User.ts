import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "./Booking";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    password!: string

    @Column()
    email!:string

    @Column()
    isActive: boolean = true

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[] =[];
}