import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CatByIdPipe } from 'src/pipes/cat-by-id.pipe';
import { ExampleParseIntPipe } from 'src/pipes/parse-int.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Public } from 'src/decorators/public.decorator';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // Example use custom pipe to do schema validation with zod
  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get('existing/:id')
  findExisting(@Param('id', new CatByIdPipe()) cat: Cat) {
    return cat;
  }

  // Default value pipe
  @Public()
  @Get()
  findAll(@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number) {
    return this.catsService.findAll(page);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(+id);
  }

  @Get('uuid/:id')
  getId(@Param('id', new ParseUUIDPipe()) uuid: string) {
    return `Valid get id ${uuid}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Put(':id')
  updateWithParamScopePipe(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCatDto: UpdateCatDto,
  ) {
    const { age } = updateCatDto;
    return `Validated with validation pipe: ${id} with age: ${age}`;
  }

  @Delete(':id')
  remove(@Param('id', new ExampleParseIntPipe()) id: number) {
    return this.catsService.remove(+id);
  }
}
