import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { HttpConfig } from 'src/config/configuration';
import databaseConfig, {
  DatabaseConfigService,
} from 'src/config/database.config';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    private configService: ConfigService,
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
    private dbConfigService: DatabaseConfigService,
  ) {
    if (dbConfigService.isConnectionPoolEnabled) {
      console.log('Load config by custom getter config');
    }
  }

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll(page: number) {
    // Test load environment from different methods
    console.log(
      'Load config from custom config: ',
      this.configService.get<string>('http.host', 'default value here', {
        infer: true,
      })!, // type & not null checking (symbol `!`)
    );
    console.log(
      'Load config from env file: ',
      this.configService.get<string>('DATABASE_USER', 'default value here'),
    );
    console.log(
      'Load config with interface declaration: ',
      JSON.stringify(this.configService.get<HttpConfig>('http')),
    );
    console.log(
      'Load config from custom register: ',
      JSON.stringify(this.configService.get<string>('database.host')),
    );
    console.log('Load config by inject namespace: ', this.dbConfig);

    return `This action returns all cats, page ${page}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
