import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

interface BookingConfirmationParams {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  bookingId: string;
  car_model?: string;
  phone?: string;
}

export async function sendBookingConfirmation(params: BookingConfirmationParams) {
  const resend = getResend();
  if (!resend) {
    console.log('[Email] RESEND_API_KEY not set — skipping email send');
    return;
  }

  const { name, email, service, date, time, bookingId, car_model, phone } = params;
  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const carRow = car_model
    ? `<tr>
                <td style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 8px 0; border-bottom: 1px solid #44474e22;">Vehicle</td>
                <td style="color: #dae2fd; font-weight: bold; padding: 8px 0; border-bottom: 1px solid #44474e22; text-align: right;">${car_model}</td>
              </tr>`
    : '';

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'M7 Tire Shop <noreply@m7tireshop.com>',
    to: email,
    subject: `Booking Confirmed — ${service} on ${formattedDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1326; color: #dae2fd; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #bfc5e4, #00daf8); padding: 32px; text-align: center;">
          <h1 style="margin: 0; color: #0b1326; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
            M7 Tire Shop
          </h1>
          <p style="color: #141a32; margin: 8px 0 0; font-weight: 600;">Booking Confirmation</p>
        </div>

        <div style="padding: 32px;">
          <p style="color: #dae2fd; font-size: 16px; margin: 0 0 24px;">Hi <strong>${name}</strong>,</p>
          <p style="color: #c4c6cf; margin: 0 0 32px;">Your appointment has been received and is pending confirmation. We'll reach out within 24 hours to confirm.</p>

          <div style="background: #171f33; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #44474e33;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 8px 0; border-bottom: 1px solid #44474e22;">Service</td>
                <td style="color: #dae2fd; font-weight: bold; padding: 8px 0; border-bottom: 1px solid #44474e22; text-align: right;">${service}</td>
              </tr>
              ${carRow}
              <tr>
                <td style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 8px 0; border-bottom: 1px solid #44474e22;">Date</td>
                <td style="color: #dae2fd; font-weight: bold; padding: 8px 0; border-bottom: 1px solid #44474e22; text-align: right;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 8px 0; border-bottom: 1px solid #44474e22;">Time</td>
                <td style="color: #dae2fd; font-weight: bold; padding: 8px 0; border-bottom: 1px solid #44474e22; text-align: right;">${time}</td>
              </tr>
              <tr>
                <td style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; padding: 8px 0;">Booking ID</td>
                <td style="color: #c4c6cf; font-size: 12px; font-family: monospace; padding: 8px 0; text-align: right;">${bookingId.slice(0, 8).toUpperCase()}</td>
              </tr>
            </table>
          </div>

          <div style="background: #171f33; border-radius: 12px; padding: 20px; margin-bottom: 32px; border-left: 4px solid #00daf8;">
            <p style="color: #00daf8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Important</p>
            <ul style="color: #c4c6cf; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
              <li>Please arrive 10 minutes early</li>
              <li>Cancellations must be made 24 hours in advance</li>
              <li>Shop address: 2242 Rodman St, Hollywood, FL 33020</li>
              <li>For emergencies, call us at (555) 123-4567</li>
            </ul>
          </div>

          <p style="color: #8e9099; font-size: 13px; text-align: center; margin: 0;">
            Thank you for choosing M7 Tire Shop.<br/>
            <strong style="color: #00daf8;">We'll see you soon!</strong>
          </p>
        </div>
      </div>
    `,
  });
}

interface StatusUpdateParams {
  name: string;
  email: string;
  service: string;
  status: string;
}

export async function sendStatusUpdate(params: StatusUpdateParams) {
  const resend = getResend();
  if (!resend) return;

  const { name, email, service, status } = params;
  const statusMessages: Record<string, string> = {
    confirmed: 'Your appointment has been <strong style="color: #60a5fa;">confirmed</strong>.',
    in_progress: 'Your vehicle is now <strong style="color: #fb923c;">being serviced</strong>.',
    completed: 'Your service has been <strong style="color: #4ade80;">completed</strong>. Ready for pickup!',
    cancelled: 'Your appointment has been <strong style="color: #f87171;">cancelled</strong>.',
  };

  const message = statusMessages[status] ?? `Your booking status has been updated to <strong>${status}</strong>.`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'M7 Tire Shop <noreply@m7tireshop.com>',
    to: email,
    subject: `Service Update — ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b1326; border-radius: 16px; padding: 40px; color: #dae2fd;">
        <h2 style="color: #00daf8; margin: 0 0 16px;">M7 Tire Shop — Status Update</h2>
        <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
        <p style="color: #c4c6cf;">${message}</p>
        <p style="color: #c4c6cf;"><strong>Service:</strong> ${service}</p>
        <p style="color: #8e9099; font-size: 13px; margin-top: 32px;">Questions? Email <a href="mailto:Fadoulmer80@gmail.com" style="color: #00daf8;">Fadoulmer80@gmail.com</a> or call (555) 123-4567</p>
      </div>
    `,
  });
}
