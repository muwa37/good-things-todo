import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoDTO {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly title: string;

  @ApiPropertyOptional({
    description: 'The status of the todo, indicating whether it is done or not',
    example: false,
  })
  @IsBoolean({ message: 'should be boolean' })
  @IsOptional()
  readonly isDone?: boolean;
}

export class UpdateTodoDTO {
  @ApiPropertyOptional({
    description: 'The updated title of the todo',
    example: 'Buy milk',
  })
  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly title?: string;

  @ApiPropertyOptional({
    description:
      'The updated status of the todo, indicating whether it is done or not',
    example: true,
  })
  @IsBoolean({ message: 'should be boolean' })
  @IsOptional()
  readonly isDone?: boolean;
}
