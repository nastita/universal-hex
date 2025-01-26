import { Module } from '@nestjs/common';
import { AssetsPrismaRepository } from './assets.prisma.repository';
import { PrismaService } from './prisma.service';

const prismaModuleProviders = [PrismaService, AssetsPrismaRepository];

@Module({
  imports: [],
  providers: prismaModuleProviders,
  exports: prismaModuleProviders,
})
export class PrismaModule {}
