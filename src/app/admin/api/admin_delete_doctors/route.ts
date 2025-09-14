import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const POST = async (req: NextRequest) => {
  try {
    const id = await req.json();

    if (id.type === 'doc') {
      const deleteID = await prisma.doctors.findUnique({
        where: { id: id.el },
      });

      if (!deleteID) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: 'Id does not exits',
        });
      }

      const imageName = deleteID.doctor_imageURL.split('/').pop();

      //delete image
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: imageName,
        })
      );

      //delete from database
      // 3️⃣ Delete the doctor record from the database
      await prisma.doctors.delete({
        where: { id: id.el },
      });

      return NextResponse.json({
        success: true,
        status: 200,
        message: 'Doctors File Deleted',
      });
    } else {
      const deleteID = await prisma.disease.findUnique({
        where: { id: id.el },
      });

      if (!deleteID) {
        return NextResponse.json({
          success: false,
          status: 400,
          message: 'Id does not exits',
        });
      }

      if (deleteID.disease_image) {
  // Here TypeScript knows it's a string
     var imageName = deleteID?.disease_image.split('/').pop();
      }



      //delete image
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: imageName,
        })
      );

      //delete from database
      // 3️⃣ Delete the doctor record from the database
      await prisma.disease.delete({
        where: { id: id.el },
      });

      return NextResponse.json({
        success: true,
        status: 200,
        message: 'service File Deleted',
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};
