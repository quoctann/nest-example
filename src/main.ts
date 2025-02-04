import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exception/all-exceptions.filter';
import { RolesGuard } from './guards/roles.guard';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
// import { RolesGuard } from './guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* use global middleware for all route */
  // app.use(logger)

  /* use global filter */
  // app.useGlobalFilters(new HttpExceptionFilter());
  /* and another way to do this */
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  /* use global validation/transformation pipes () */
  app.useGlobalPipes(new ValidationPipe());

  /* use global guards, better middleware because has execution context
  therefore can be determine with is the next end point */
  // app.useGlobalGuards(new RolesGuard());

  /* use global interceptor */
  // app.useGlobalInterceptors(new LoggingInterceptor());

  /* see more about hybrid app, method use like userGlobalXYZ need to be mount
  different */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
