import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Updates {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    user_id: number;

    @Column({nullable: false, type: "float"})
    long: number;

    @Column({nullable: false, type: "float"})
    lat: number;

    @Column({nullable: false})
    heart_rate: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    updated_on: Date;   
}
