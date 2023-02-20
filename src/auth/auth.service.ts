/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../module/user/user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService:UserService,
        private jwtService: JwtService,
        ){}
    async validateUser(email,password){
        const user=await this.userService.getUserByUsername(email);
            const isMtach=await bcrypt.compare(password,user.password)
            console.log(isMtach)
            if(user && isMtach){
                return user;
            }
        return null
    }
    async login(user:any){
        const payload ={email:user.email, sub:user.id};
        return {
            accesstoken:this.jwtService.sign(payload)
        }
    }

    async signup(user:{name:string,email:string,password:string}){
        const result = await this.userService.getUserByUsername(user.email);
        
        if(result)
        {
            return "email already exist";
        }

        const salt=10;
        user.password=await bcrypt.hash(user.password,salt);
        
        const response = await this.userService.registerUser(user)
        if(!response){
            return "error occured";
        }
        return response
    }
}
