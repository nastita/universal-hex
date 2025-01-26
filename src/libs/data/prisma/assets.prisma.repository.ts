import { Injectable } from '@nestjs/common';
import { AssetsRepository } from '../interfaces/assets.repository.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class AssetsPrismaRepository implements AssetsRepository {
  constructor(private prisma: PrismaService) {}

  async getAssets() {
    return this.prisma.asset.findMany();
  }
}
