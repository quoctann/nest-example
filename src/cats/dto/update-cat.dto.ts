import { IsInt, IsString } from 'class-validator';

// example for decorator based validation
export class UpdateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
