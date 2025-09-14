import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookiesStore = await cookies();

    cookiesStore.set('auth_code', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'User is Logged out',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}
