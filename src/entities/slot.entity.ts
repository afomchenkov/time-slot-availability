import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SalesManager } from './sales-manager.entity';

@Entity({ name: 'slots' })
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'booked' })
  booked: boolean;

  @Column({ name: 'sales_manager_id' })
  salesManagerId: string;

  @ManyToOne(() => SalesManager, (smTable) => smTable.id)
  @JoinColumn({ name: 'sales_manager_id' })
  salesManager: SalesManager | null;
}
