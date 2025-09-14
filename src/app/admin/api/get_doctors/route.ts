import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export const GET = async (req: NextRequest) => {
  try {
    const doctorsData = await prisma.doctors.findMany();

    if (doctorsData.length < 0) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'No Data avaliable',
      });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: doctorsData,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};
