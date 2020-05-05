import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    firstName: string;

    @Column()
    lastName: string;
}