import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  LessThanOrEqual,
  MoreThanOrEqual,
  ArrayContains,
} from 'typeorm';
import { Slot } from '../entities';

export type FindSlotsByDateRange = {
  startDate: Date;
  endDate: Date;
  language: string;
  rating: string;
  products: string[];
};

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,
  ) {}

  async findAll(): Promise<Slot[]> {
    return this.slotRepository.find({
      relations: ['salesManager'],
    });
  }

  async findOne(id: number): Promise<Slot | null> {
    return this.slotRepository.findOneBy({ id });
  }

  async findSlotsByDateRange({
    startDate,
    endDate,
    language,
    rating,
    products,
  }: FindSlotsByDateRange): Promise<Slot[]> {
    return this.slotRepository.find({
      relations: ['salesManager'],
      where: {
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
        salesManager: {
          languages: ArrayContains([language]),
          customerRatings: ArrayContains([rating]),
          products: ArrayContains([...products]),
        },
      },
      // cache the query
      cache: true,
    });
  }

  async remove(id: number): Promise<void> {
    await this.slotRepository.delete(id);
  }
}
