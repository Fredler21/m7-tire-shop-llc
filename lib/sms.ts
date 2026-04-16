import twilio from 'twilio';

function getTwilio() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!sid || !token || !from) return null;
  return { client: twilio(sid, token), from };
}

interface BookingSmsParams {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  bookingId: string;
  car_model?: string;
}

export async function sendBookingSms(params: BookingSmsParams) {
  const tw = getTwilio();
  if (!tw) {
    console.log('[SMS] Twilio env vars not set — skipping SMS send');
    return;
  }

  const { name, phone, service, date, time, bookingId, car_model } = params;

  // Normalize phone: ensure it starts with +
  const to = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

  const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const vehicleLine = car_model ? `\nVehicle: ${car_model}` : '';
  const body = [
    `Hi ${name}! Your M7 Tire Shop appointment is confirmed.`,
    ``,
    `Service: ${service}${vehicleLine}`,
    `Date: ${formattedDate}`,
    `Time: ${time}`,
    `Ref: ${bookingId.slice(0, 8).toUpperCase()}`,
    ``,
    `Please arrive 10 min early. Address: 2242 Rodman St, Hollywood FL. Questions? Call (555) 123-4567.`,
  ].join('\n');

  await tw.client.messages.create({ from: tw.from, to, body });
}

interface StatusSmsParams {
  name: string;
  phone: string;
  service: string;
  status: string;
}

export async function sendStatusSms(params: StatusSmsParams) {
  const tw = getTwilio();
  if (!tw) return;

  const { name, phone, service, status } = params;
  const to = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;

  const statusMessages: Record<string, string> = {
    confirmed: `Your ${service} appointment at M7 Tire Shop is CONFIRMED. See you soon!`,
    in_progress: `Hi ${name}, your vehicle is now being serviced at M7 Tire Shop.`,
    completed: `Hi ${name}, your ${service} at M7 Tire Shop is complete! Your vehicle is ready for pickup.`,
    cancelled: `Hi ${name}, your ${service} appointment at M7 Tire Shop has been cancelled. Call (555) 123-4567 or email Fadoulmer80@gmail.com to rebook.`,
  };

  const body = statusMessages[status] ?? `Hi ${name}, your ${service} booking status has been updated to: ${status}.`;

  await tw.client.messages.create({ from: tw.from, to, body });
}
