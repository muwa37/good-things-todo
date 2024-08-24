import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegistrationDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly name: string;

  @ApiProperty({
    description: 'The tag of the user, typically used as a unique identifier',
    example: 'john_doe',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly tag: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less than 6 and no more than 20 symbols' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly password: string;
}

export class LoginDTO {
  @ApiProperty({
    description: 'The tag of the user, used for login',
    example: 'john_doe',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly tag: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less than 6 and no more than 20 symbols' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly password: string;
}
