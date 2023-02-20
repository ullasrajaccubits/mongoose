/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';
@Injectable()
export class MailService {
    constructor(       
        private readonly jwtService: JwtService,
        private readonly configService:ConfigService,
        @Inject(forwardRef(()=>UserService)) private readonly userService:UserService,
        private readonly mailerService: MailerService,      
        ) {}

    async sendMail(email: string, recipient:string, subject: string, content:string) {
        console.log(email)
        await this.mailerService.sendMail({
            from: email,
            to: recipient,
            subject: subject,
            text: content,
        })
    }

    async sendVerificationLink(email: string) {
        const payload: any = { email };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });
     
        const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
     
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
     
        return this.sendMail(
           email,email, 'Email confirmation',text,
        )
      }

    async confirmEmail(email:string){
       const user=await this.userService.getUserByUsername(email);
        if(user.isEmailConfirmed){
            throw new BadRequestException('Email already confirmed');
        }
       await this.userService.markEmailAsConfirmed(email)
    }
    async confirmationToken(token:string){
        try{
            const payload= await this.jwtService.verify(token,{
                secret:this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });
            if(typeof payload==='object'&&'email' in payload){
                return payload.email;
            }
            throw new BadRequestException();
        }catch(err){
            if(err?.name==='TokenExpiredError'){
                throw new BadRequestException('Email confirmation token expired');
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }   
    async resendConfirmationLink(userId:string){
        const user=await this.userService.getById(userId);
        if(user.isEmailConfirmed){
            throw new BadRequestException('Email already confirmed');
        }
        await this.sendVerificationLink(user.email)
    }
}
