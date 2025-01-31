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
    // TODO: Maybe addresses should always be lowercase in db to avoid this
    return this.prisma.asset.findFirst({
      where: {
        contractAddress: {
          equals: contractAddress,
          mode: 'insensitive',
        },
      },
      include: {
        links: true,
      },
    });
  }
}
