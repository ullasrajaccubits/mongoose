/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @Length(5,50)
  name:string

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5,50)
  password: string;
}