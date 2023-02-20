/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from '../../schema/user.schema'
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from 'src/config/constants';
import { MailModule } from 'src/mail/mail.module';
//import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '60d'
    },
  }),
MailModule,
 // AuthModule,
],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
