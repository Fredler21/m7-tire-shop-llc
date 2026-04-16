export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  category: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  carModel: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
