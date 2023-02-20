/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmEmailDto {
    @IsString()
    @IsNotEmpty()
    token:string;
}