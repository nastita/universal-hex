import { Injectable } from '@nestjs/common';
import { Asset, AssetLink } from '@prisma/client';

export interface AssetWithLinks extends Asset {
  links?: AssetLink[];
}

@Injectable()
export abstract class AssetsRepository {
  abstract getAssets(): Promise<AssetWithLinks[]>;
  abstract getAssetByAddress(
    contractAddress: string,
  ): Promise<AssetWithLinks | null>;
}
