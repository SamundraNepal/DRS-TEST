interface Appointment {
  doctor_name:string;
  full_name: string;
  email_address: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  reason_to_visit: string;
}


export default function generateAppointmentEmail(appointment: Appointment) {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Appointment Scheduled</h2>
      <p>Hello Dr.${appointment.doctor_name},</p>
      <p>You have a new appointment booked with the following details:</p>

      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Patient Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.full_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.email_address}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.phone_number}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.appointment_date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.appointment_time}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Reason:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.reason_to_visit}</td>
        </tr>
      </table>

      <p>Please contact the patient if any changes are needed.</p>
      <p>Best regards,<br/>CTVS EXPERTS</p>
    </body>
  </html>
  `;
}

