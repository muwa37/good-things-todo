import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TodoDTO {
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly title: string;

  @IsBoolean({ message: 'should be boolean' })
  @IsOptional()
  readonly isDone?: boolean;
}

export class UpdateTodoDTO {
  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly title: string;

  @IsBoolean({ message: 'should be boolean' })
  @IsOptional()
  readonly isDone?: boolean;
}
