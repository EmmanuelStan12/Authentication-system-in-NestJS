import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    constructor();

    constructor(firstname: string, lastname: string, email: string, username: string, password: string, id?: number);

    constructor(firstname?: string, lastname?: string, email?: string, username?: string, password?: string, id?: number) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.username = username
        this.id = id
        this.password = password
    }

}