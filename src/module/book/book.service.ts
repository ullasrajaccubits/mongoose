/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBook } from 'src/interface/book.interface';
import { createBookDto } from './dto/createBook.dto';


@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private bookModel:Model<IBook>) {}
    async getAllBooks()
    {
        const bookDetails=await this.bookModel.find();
        if(!bookDetails || bookDetails.length==0){
            throw new NotFoundException('Book detail are not found!')
        }
        return bookDetails;
    }

    async addBook(bookDetails:createBookDto){
        const newBook = await new this.bookModel(bookDetails);
        console.log(newBook)
        return newBook.save();
    }

    async getBook(id:string){
        const bookDetails = await this.bookModel.findById(id).exec();
        if(!bookDetails){
            throw new NotFoundException('Book not found');
        }
        return bookDetails;
    }

    async updateBook(id:string,updateBookdetails:any){
        const book=await this.bookModel.findByIdAndUpdate(id,updateBookdetails,{new:true});
        if(!book){
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async deleteBook(id:string){
        const deletebook=await this.bookModel.findByIdAndDelete(id);
        if(!deletebook){
            throw new NotFoundException('Book not found');
        }
        return deletebook;
    }
}
