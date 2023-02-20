/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/createBook.dto';

@Controller('book')
export class BookController {

    constructor (private readonly bookService:BookService){}
    @Get("")
    getAllBooks(){
        try{
           return this.bookService.getAllBooks();
        }catch(err){
            console.log(err)
        }
    }

    @Post("/addBook")
    addBook(@Body() bookDetails:createBookDto)
    {
        
        return this.bookService.addBook(bookDetails)
    }

    @Get("/:id")
    getBook(@Param('id') id:string){
        return this.bookService.getBook(id)
    }

    @Patch("/:id")
    updateBook(@Param('id') id:string,@Body() bookDetails:any){
        return this.bookService.updateBook(id,bookDetails)
    }

    @Delete("/:id")
    deleteBook(@Param('id') id:string)
    {
        return this.bookService.deleteBook(id);
    }

}
