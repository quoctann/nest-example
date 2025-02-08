import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
}));

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get isConnectionPoolEnabled(): boolean {
    return this.configService.get('CONNECTION_POOL') === 'true';
  }
}
