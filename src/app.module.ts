import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule],
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
