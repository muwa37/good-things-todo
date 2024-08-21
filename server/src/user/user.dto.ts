import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly name: string;

  @IsString({ message: 'should be string' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly tag: string;

  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less then 6 and no more then 20 symbols' })
  @IsNotEmpty({ message: 'should be filled' })
  readonly password: string;
}

export class UpdateUserDTO {
  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'should be string' })
  @IsOptional()
  readonly tag?: string;

  @IsString({ message: 'should be string' })
  @Length(6, 20, { message: 'no less then 6 and no more then 20 symbols' })
  @IsOptional()
  readonly password?: string;
}

export class FriendDTO {
  readonly friendId: string;
}
