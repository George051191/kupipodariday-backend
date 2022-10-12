/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';

import nodemailer from 'nodemailer';

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
      to: `trubacheff_91@mail.ru`,
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
