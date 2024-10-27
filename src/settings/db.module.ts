import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot, SalesManager } from '../entities';
import { SlotService, SalesManagerService } from '../services';

const Entities = [Slot, SalesManager];

@Module({
  imports: [TypeOrmModule.forFeature(Entities)],
  providers: [SlotService, SalesManagerService],
  exports: [SlotService, SalesManagerService],
})
export class DBModule {}
