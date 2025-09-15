import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
const bcrypt = require('bcrypt');
// @ts-expect-error this is needed
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const POST = async (req: NextRequest) => {
  try {
    const { email_address, password } = await req.json();

    if (!email_address || !password) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'Invalid Email and Password',
      });
    }

    const userData = await prisma.user.findUnique({
      where: { email: email_address },
    });

    if (!userData) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'Email does not exits. Please do the sign up',
      });
    }

    const passwordCheck = await bcrypt.compare(password, userData.password);

    if (!passwordCheck) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'Incorrect Password',
      });
    }

    const token = jwt.sign(
      { userID: userData.id, email: userData.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );



    // await CreateCookies('auth_code', token);
  
    const res = NextResponse.json({
      success: true,
      status: 200,
      message: 'Success',
    });


    // fix here 

  res.cookies.set("auth_code", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production", // ⚠️ use false if still on http://
      sameSite: "lax", // or "none" if frontend/backend are different origins
      maxAge: 60 * 60,
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};
 async function CreateCookies(token_name: string, auth_token: string) {
  const cookiesStore = await cookies();
  cookiesStore.set(`${token_name}`, auth_token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hr exp date
  });
}
