/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from '../module/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategy/local.strategy';
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../strategy/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
    controllers: [AuthController],
    imports: [UserModule, PassportModule, JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{expiresIn: '1d'}
    }),
MailModule],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
