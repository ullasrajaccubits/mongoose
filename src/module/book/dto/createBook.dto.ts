/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length} from "class-validator";

export class createBookDto{
    @IsString()
    @Length(3,100)
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    authorId:string

    @IsString()
    description:string

    @IsString()
    image:string
}