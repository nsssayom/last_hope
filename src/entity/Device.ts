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

    @Column({nullable: true})
    hw_version: string;

    @Column({nullable: true})
    sw_version: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    assigned_on: Date;

    @Column({default:() => true})
    is_active: Boolean;

    @Column()
    area_code: Number;

    @ManyToOne(()=> User, user => user.devices)
    user: User
}
