import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(@Query('version') version) {
    if (version && version === '2') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
    return '';
  }
}
