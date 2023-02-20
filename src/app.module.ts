/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';


import { AppConfigurationModule } from './config/configuration.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppConfigurationService } from './config/configuration.service';
import { BookModule } from './module/book/book.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AppConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (config: ConfigService)=>({
        transport: {
          service:config.get('EMAIL_HOST'), // upgrade later with STARTTLS
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService]
    }),
    
    UserModule,
    BookModule,
    AuthModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
