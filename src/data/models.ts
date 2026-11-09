import type { ImageKey } from './images';

export type CategoryId = 'cleaning' | 'plumbing' | 'electrical' | 'handyman' | 'moving' | 'beauty';

export type Category = { id: CategoryId; name: string; icon: string };

export type ServicePackage = { id: string; name: string; hours: number; price: number };

export type Review = { author: string; stars: number; text: string; when: string };

export type Provider = {
  id: string;
  name: string;
  firstName: string;
  service: string;
  categoryId: CategoryId;
  rating: number;
  reviews: number;
  rate: number;
  distance: number;
  nextSlot: string;
  availableToday: boolean;
  eco: boolean;
  years: number;
  jobs: number;
  onTime: number;
  avatar: ImageKey;
  portrait?: ImageKey;
  cover?: ImageKey;
  work: ImageKey[];
  packages: ServicePackage[];
  review: Review;
};

// The job lifecycle shown on the tracking timeline, in order.
export type BookingStatus = 'requested' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed';

export type StatusEvent = { status: BookingStatus; at?: string };

export type Booking = {
  id: string;
  providerId: string;
  packageId: string;
  serviceName: string;
  hours: number;
  dateLabel: string;
  time: string;
  address: string;
  notes: string;
  subtotal: number;
  total: number;
  promo?: string;
  status: BookingStatus;
  events: StatusEvent[];
  rated?: boolean;
};

export type Message = { id: string; from: 'me' | 'them'; text: string; at: string };

export type Conversation = {
  id: string;
  providerId?: string;
  title: string;
  avatar?: ImageKey;
  bookingId?: string;
  unread: number;
  when: string;
  messages: Message[];
};

// Provider-side request (the other side of the marketplace, simulated in provider mode).
export type JobRequest = {
  id: string;
  customer: string;
  avatar: ImageKey;
  service: string;
  when: string;
  distance: number;
  price: number;
  hours: number;
  tag: 'Repeat client' | 'New client';
  state: 'new' | 'accepted' | 'declined';
};

export type Day = { key: string; weekday: string; day: number; label: string };

export type Filters = { availableToday: boolean; topRated: boolean; under40: boolean; eco: boolean };
