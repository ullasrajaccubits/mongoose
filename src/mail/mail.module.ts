/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/module/user/user.module';
import { MailService } from './mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [JwtModule, ConfigModule, forwardRef(()=> UserModule) ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
