import { Injectable } from '@nestjs/common';
import {
  AssetsRepository,
  AssetWithLinks,
} from '../interfaces/assets.repository.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class AssetsPrismaRepository implements AssetsRepository {
  constructor(private prisma: PrismaService) {}

  async getAssets(): Promise<AssetWithLinks[]> {
    return this.prisma.asset.findMany({
      include: {
        links: true,
      },
    });
  }

  async getAssetByAddress(
    contractAddress: string,
  ): Promise<AssetWithLinks | null> {
    return this.prisma.asset.findUnique({
      where: {
        contractAddress,
      },
      include: {
        links: true,
      },
    });
  }
}
