import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesManager } from '../entities';

@Injectable()
export class SalesManagerService {
  constructor(
    @InjectRepository(SalesManager)
    private smRepository: Repository<SalesManager>,
  ) {}

  async findAll(): Promise<SalesManager[]> {
    return this.smRepository.find({
      relations: ['slots'],
    });
  }

  async findOne(id: number): Promise<SalesManager | null> {
    return this.smRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.smRepository.delete(id);
  }
}
