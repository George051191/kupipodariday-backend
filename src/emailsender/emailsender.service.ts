import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSender {
  async sendEmail(mails: string[], message: string, path: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'mysuperlogingeo@yandex.ru',
        pass: 'pdgokodlivbpctdi',
      },
    });

    await transporter.sendMail({
      from: 'mysuperlogingeo@yandex.ru',
      to: `${mails}`,
      subject: 'сбор денег',
      text: `${message}`,
      attachments: [
        {
          path: `${path}`,
        },
      ],
    });
  }
}
