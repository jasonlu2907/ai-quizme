import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { transporter } from '@/config/nodemailer';

const email = process.env.NODEMAIL_MAIL;

const mailOptions = {
  from: email,
};

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!password || !name || !email) {
    console.log('Bad request! Missing either pw, name, or email.');
    return NextResponse.error();
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // generate a Verification Token
  const token = await prisma.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      userId: user.id,
    },
  });

  const messageData = {
    ...mailOptions,
    to: user.email,
    subject: 'Please Activate Your QuizMe Account',
    text: `Hello ${user.name}, please activate your account by clicking this link: http://localhost:3000/activate/${token.token}`,
    html: `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                line-height: 1.5;
            }
            .cta-button {
                display: inline-block;
                margin: 20px 0;
                padding: 15px 25px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                color: #999999;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1>Welcome, ${user.name}!</h1>
                <p>Thank you for signing up. We're excited to have you on board. To get started, please activate your account by clicking the button below:</p>
                <a href="http://localhost:3000/activate/${token.token}" class="cta-button">Activate Your Account</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 Quiz Me. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`,
  };

  try {
    await transporter.sendMail({
      ...messageData,
    });

    return NextResponse.json({
      message: 'Successfully registered user!',
      ...user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
