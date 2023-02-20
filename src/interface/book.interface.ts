/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface IBook extends Document{
    readonly name:string;
    readonly authorId:string;
    readonly description:string;
    readonly image:string;
}