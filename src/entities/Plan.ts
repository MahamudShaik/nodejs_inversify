import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class Plan {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    amount: string;

    @Column()
    validity: string;

    @Column()
    data: string;

}
