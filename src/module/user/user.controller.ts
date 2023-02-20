/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
} from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
//import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from 'src/mail/mail.service';
import { FormDataRequest } from 'nestjs-form-data';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { UploadedFiles } from '@nestjs/common/decorators';
import { createWriteStream } from 'fs';
import { csvFileFilter } from './dto/fileData.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as csvtojson from 'convert-csv-to-json';
import { createReadStream } from 'fs';
import { join } from 'path';
const csvfile = 'test.csv';
// @UseGuards(AuthGuard('jwt'))

const pngFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.pdf') {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    //   private readonly mailerService: MailerService,
    private readonly mailService: MailService,
  ) {}
  @Get()
  async getUser(@Request() req: any) {
    console.log(req.user);
    return this.userService.getById(req.user.id);
  }
  @Post('/sendEmail')
  async sendEmail(@Body() emailDetails: any, @Request() req: any) {
    return this.userService.sendEmail(emailDetails, req.user.email);
  }
  @Post('/confirm')
  async confirm(@Body() confirmationDta: any) {
    const email = await this.mailService.confirmationToken(
      confirmationDta.token,
    );
    await this.mailService.confirmEmail(email);
  }
  @Post('/resendConfirmationLink')
  async resendConfirmationLink(@Request() req: any) {
    await this.mailService.sendVerificationLink(req.user.email);
  }

  @Post('/fileUpload')
  @UseInterceptors(FileInterceptor('file'))
  async csv(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    const nfile = await createReadStream(
      join(process.cwd(), file.originalname),
    );
    console.log(nfile);
    const json = await csvtojson
      .parseSubArray('*', ',')
      .getJsonFromCsv('D:/ullas/mongoose/src/test.csv');
    for (let i = 0; i < json.length; i++) {
      console.log(json[i]);
    }
  }
}
