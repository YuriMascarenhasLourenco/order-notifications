import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryColumn({ type: 'uuid' })
  eventId: string;
  @Column()
  name: string;
  @Column({ type: 'float' })
  price: number;
  @Column()
  quantity: number;
}
