import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index} from "typeorm";
import {User} from "./User"

@Entity()
export class Device {

    /*
    -----------------------
    -Devices table columns-
    -----------------------
    -id
    -uuid
    -gsm_imei
    -gsm_msisdn
    -hw_version
    -sw_version
    */

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({nullable: false})
    @Index({ unique: true })
    gsm_imei: string;

    @Column({nullable: false})
    @Index({ unique: true })
    gsm_msisdn: string;

    @Column({nullable: false})
    hw_version: string;

    @Column({nullable: false})
    sw_version: string;

    @Column()
    assigned_on: Date;

    @Column()
    is_active: Boolean;

    @ManyToOne(()=> User, user => user.devices)
    user: User
}
