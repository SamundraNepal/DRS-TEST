import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
const bcrypt = require('bcrypt');

export const POST = async (req: NextRequest) => {
  try {
    const {
      first_name,
      last_name,
      email_address,
      password,
      confirm_password,
      auth,
    } = await req.json();

    const AuthCode = process.env.AUTHCODE;

    const IsAuth = AuthCode === auth;

    if (!IsAuth) {
      return NextResponse.json({
        success: false,
        message: 'Invalid Admin Code',
      });
    }

    const validate = validatePassword(password);

    if (!validate) {
      return NextResponse.json({
        success: false,
        message:
          'Password must have One uppercase , One lowercase , one number and one unique symbol',
      });
    }

    const passwordMatch = password === confirm_password;

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email_address },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email already exists',
      });
    }

    // hash password
    const hashPassword = await HasPassword(password);

    //  create user
    await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name, // or a value from your form
        email: email_address,
        password: hashPassword,
        auth_code: '', // you can generate a code if needed
      },
    });

    return NextResponse.json({ success: true, message: 'Success' });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    });
  }
};

function validatePassword(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
}

async function HasPassword(password: string) {
  const saltRounds = 10;

  const hasPassword = await bcrypt.hash(password, saltRounds);

  return hasPassword;
}
