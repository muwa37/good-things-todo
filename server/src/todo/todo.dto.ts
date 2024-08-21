import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TodoDTO {
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly title: string;

  @IsBoolean({ message: 'should be boolean' })
  readonly isDone?: boolean;
}
