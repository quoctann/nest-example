import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import * as Joi from 'joi';
import configuration from 'src/config/configuration';
import databaseConfig from 'src/config/database.config';
import { validate } from 'src/config/env.validation';
import {
  AuthModule,
  CatsModule,
  DogsModule,
  NotesModule,
  UsersModule,
} from '..';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConfigModule.forRoot registering ConfigService
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.env'], // can be multi or single env, the first one take precedence
      isGlobal: true, // instead import on each module used it, we can make it global
      load: [configuration, databaseConfig], // load custom config
      // skipProcessEnv // to ignore load .env as process.env
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
      validationOptions: {
        allowUnknown: false, // allow unknown key on env
        abortEarly: true, // stop validation on the first error
      },
      validate: validate,
    }),
    CqrsModule.forRoot(),
    NotesModule,
    CatsModule,
    AuthModule,
    UsersModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // apply middleware, also can config async/await inside this method body
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'notes', method: RequestMethod.POST },
        { path: 'notes', method: RequestMethod.OPTIONS },
      )
      .forRoutes({ path: 'notes', method: RequestMethod.GET });

    // apply as function, also multiple middleware
    // consumer.apply(loggerFunc, helmet).forRoutes(NotesController);
  }
}
