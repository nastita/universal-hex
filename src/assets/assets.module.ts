import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { DataModule } from '../libs/data/data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, DataModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
