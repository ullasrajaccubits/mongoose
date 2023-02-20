/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
    export class UserService {
        constructor(
           @InjectModel(User.name) private userModel: Model<UserDocument>, 
           @Inject(forwardRef(()=>MailService)) private mailService:MailService
        ){}
        
        
        async registerUser(userDetails:CreateUserDto){
          const createUser=await new this.userModel(userDetails);
          const user = await this.userModel.findOne({name:createUser.email});
          if(user){
            throw new BadRequestException("Email already exist");
          }
          return createUser.save();
        }
        
        async getUserByUsername(Email:string){
          const user=await this.userModel.findOne({
            email:Email
          }).exec();
          
          if(user)
          {
            return user;
          }
          
        }

        async sendEmail(emailDetails:any,sender:string){
          const {recipient,subject,content}=emailDetails;
          return await this.mailService.sendMail(sender,recipient,subject,content)
        }

        async markEmailAsConfirmed(email:string){
          return this.userModel.findOneAndUpdate({email},{
            isEmailConfirmed:true
          })
        }

        async getById(id:string)
        {
          console.log(id)
          return this.userModel.findById({_id:id}).exec();
        }
    }
