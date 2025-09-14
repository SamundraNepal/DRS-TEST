import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const imageFile = formData.get('imageFile') as File;
    const jsonData = formData.get('json') as string;
    if (!jsonData) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: 'No jsonData',
      });
    }

    const parseData = JSON.parse(jsonData) || {};

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `Disease_image_${Date.now()}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: buffer,
        ContentType: imageFile.type,
      })
    );

    const imageURL = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    await prisma.disease.create({
      data: {
        disease_name: parseData.disease_name,
        disease_conditions: parseData.disease_conditions,
        disease_treatments: parseData.disease_treatments,
        disease_image: imageURL,
      },
    });

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Success',
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};
