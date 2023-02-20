/* eslint-disable prettier/prettier */
import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from '../module/user/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService,
       private mailService:MailService
        ){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req:any){
        return await this.authService.login(req.user)
    }

    @Post('/signup')
    async signup(@Body() user:CreateUserDto){
        const newUser=await this.authService.signup(user);
        await this.mailService.sendVerificationLink(user.email);
        return newUser;
    }
}
