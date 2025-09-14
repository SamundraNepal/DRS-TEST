import { NextRequest, NextResponse } from 'next/server';
import generateAppointmentEmail from '../../../../../email_skeleton/doctor_appoitement';
import NodeMailerSender from '../../../../../lib/nodemailer';
import generateUserConfirmationEmail from '../../../../../email_skeleton/appointment_user_confirm';






export async function POST(req: NextRequest) {



  try {


    const formData = await req.json();


  const   doctorEmail = formData.doctor_email;

  const appointmentData = {
    doctor_name:formData.doctor_name,
  full_name: formData.full_name,
  email_address:formData.email_address,
  phone_number: formData.phone_number,
  appointment_date: formData.appointment_date,
  appointment_time: formData.appointment_time,
  reason_to_visit:formData.reason_to_visit,
};


const htmlSkeleton = generateAppointmentEmail(appointmentData);

const confirmEmailSkeletom = generateUserConfirmationEmail(appointmentData);

    await NodeMailerSender({
    To:doctorEmail,
    Subject:'New Appointment',
    htmlForm:htmlSkeleton
})


  await NodeMailerSender({
    To:appointmentData.email_address,
    Subject:'Booking Confirmed',
    htmlForm:confirmEmailSkeletom
})




return NextResponse.json({
      success: true,
      status: 201,
      message: 'request sent to the doctor',
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
}
