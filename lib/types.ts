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
  user_id?: string | null;
  name: string;
  phone: string;
  email: string;
  car_model: string;
  vehicle_id?: string | null;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  assigned_to?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  name: string;
  phone?: string;
  role: 'customer' | 'admin' | 'mechanic';
  created_at: string;
}

export interface Vehicle {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  license_plate?: string;
  vin?: string;
  created_at: string;
}

export interface AvailableSlot {
  id: string;
  date: string;
  time: string;
  is_booked: boolean;
}

export interface Estimate {
  id: string;
  user_id?: string | null;
  issue: string;
  vehicle_description?: string;
  price_min?: number;
  price_max?: number;
  notes?: string;
  created_at: string;
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

// Status display helpers
export const STATUS_LABELS: Record<Booking['status'], string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const STATUS_COLORS: Record<Booking['status'], string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  confirmed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  in_progress: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  completed: 'text-green-400 bg-green-400/10 border-green-400/20',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};
