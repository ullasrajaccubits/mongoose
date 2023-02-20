/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';


export type BookDocument=HydratedDocument<Book>;

@Schema()

export class Book {
    
    @Prop({required: true})
    name:string;

    @Prop({required: true})
    authorId:string

    @Prop({required: true})
    description:string;

    @Prop({required:true})
    image:string;
}

export const BookSchema =SchemaFactory.createForClass(Book);