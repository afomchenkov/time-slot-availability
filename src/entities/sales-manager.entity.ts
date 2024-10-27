import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Slot } from './slot.entity';

@Entity({ name: 'sales_managers' })
export class SalesManager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column('varchar', { name: 'languages', array: true })
  languages: string[];

  @Column('varchar', { name: 'products', array: true })
  products: string[];

  @Column('varchar', { name: 'customer_ratings', array: true })
  customerRatings: string[];

  @OneToMany(() => Slot, (slot) => slot.salesManager)
  @JoinColumn({
    name: 'salesManagerId',
    referencedColumnName: 'sales_manager_id',
  })
  slots: Slot[];
}
