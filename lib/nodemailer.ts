// @ts-expect-error this is needed

import nodemailer from 'nodemailer';

type Props = {
  To: string;
  Subject?: string;
  htmlForm: string;
};

export default async function NodeMailerSender({
  To,
  Subject ='Booking Conformation',
  htmlForm,
}: Props) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"CTVS EXPERTS" <noreply@ctvs.com>`,
      to: To,
      subject: Subject,
      html: htmlForm,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${To}`);
  } catch (err: any) {
    console.error('❌ Failed to send email:', err.message);
    throw new Error('Email failed to send');
  }
}