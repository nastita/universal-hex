import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { DataModule } from './libs/data/data.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './libs/logger/logger.module';

@Module({
  imports: [
    // Validate environment variables
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        DATABASE_URL: Joi.string().required(),
        THE_GRAPH_API_KEY: Joi.string().required(),
      }),
    }),
    LoggerModule, // Global
    DataModule,
    AssetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
