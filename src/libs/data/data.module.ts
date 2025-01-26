import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AssetsPrismaRepository } from './prisma/assets.prisma.repository';
import { AssetsRepository } from './interfaces/assets.repository.interface';

const dataModuleProviders = [
  { provide: AssetsRepository, useClass: AssetsPrismaRepository },
];

@Module({
  imports: [PrismaModule],
  providers: dataModuleProviders,
  exports: dataModuleProviders,
})
export class DataModule {}
