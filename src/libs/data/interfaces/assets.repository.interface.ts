import { Injectable } from '@nestjs/common';
import { Asset } from '@prisma/client';

@Injectable()
export abstract class AssetsRepository {
  abstract getAssets(): Promise<Asset[]>;
}
