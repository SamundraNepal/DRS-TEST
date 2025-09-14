interface Appointment {
  doctor_name: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  reason_to_visit: string;
}

export default function generateUserConfirmationEmail(appointment: Appointment) {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Your Appointment is Confirmed</h2>
      <p>Hi ${appointment.full_name},</p>
      <p>Your appointment has been successfully scheduled with the following details:</p>

      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Doctor:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">Dr. ${appointment.doctor_name}</td>
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
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact Doctor:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${appointment.doctor_name} via clinic</td>
        </tr>
      </table>

      <p>Please arrive a few minutes early and contact the clinic if you need to reschedule.</p>
      <p>Thank you for choosing CTVS EXPERTS!<br/>We look forward to seeing you.</p>
    </body>
  </html>
  `;
}
