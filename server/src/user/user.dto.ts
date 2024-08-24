import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly name: string;

  @ApiProperty({
    description: 'Tag of the user',
    example: 'john_doe',
  })
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly tag: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'P@ssw0rd',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less than 6 and no more than 20 symbols' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly password: string;
}

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'Tag of the user',
    example: 'john_doe',
  })
  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly tag?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    example: 'P@ssw0rd',
    minLength: 6,
    maxLength: 20,
  })
  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less than 6 and no more than 20 symbols' })
  @IsOptional()
  readonly password?: string;
}

export class FriendDTO {
  @ApiProperty({
    description: 'Id of the friend',
    example: 'asdcx1wedsada2er',
  })
  readonly friendId: string;
}
