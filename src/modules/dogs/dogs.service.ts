import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/configuration';

@Injectable()
export class DogsService {
  // second argument to ensure strict type checking, so when use in executable
  // code we don't need type assertion anymore
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  create(createDogDto: CreateDogDto) {
    return 'This action adds a new dog';
  }

  findAll() {
    // Test config service load environment prevent accessing a config property that does not exist.
    const port = this.configService.get('PORT', { infer: true });
    // const url = this.configService.get('URL', { infer: true }); // invalid at type checking
    console.log('Load config with infer type checking: ', port);

    return `This action returns all dogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
