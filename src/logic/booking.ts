import type { Booking, BookingStatus, Filters, Provider } from '../data/models';

export const STATUS_STEPS: BookingStatus[] = ['requested', 'accepted', 'on_the_way', 'in_progress', 'completed'];

export const STATUS_LABEL: Record<BookingStatus, string> = {
  requested: 'Requested',
  accepted: 'Accepted',
  on_the_way: 'On the way',
  in_progress: 'In progress',
  completed: 'Completed',
};

export function nextStatus(s: BookingStatus): BookingStatus {
  const i = STATUS_STEPS.indexOf(s);
  return STATUS_STEPS[Math.min(i + 1, STATUS_STEPS.length - 1)];
}

// Moves a booking one step forward and stamps the event time.
export function advance(b: Booking, at: string): Booking {
  if (b.status === 'completed') return b;
  const status = nextStatus(b.status);
  return { ...b, status, events: [...b.events, { status, at }] };
}

export function stepState(b: Booking, step: BookingStatus): 'done' | 'current' | 'pending' {
  const cur = STATUS_STEPS.indexOf(b.status);
  const i = STATUS_STEPS.indexOf(step);
  if (i < cur || (i === cur && b.status === 'completed')) return 'done';
  return i === cur ? 'current' : 'pending';
}

export function headline(b: Booking, firstName: string): { title: string; sub: string } {
  switch (b.status) {
    case 'requested':
      return { title: `Waiting for ${firstName}`, sub: 'Most pros reply within 5 min' };
    case 'accepted':
      return { title: `${firstName} accepted`, sub: `${b.dateLabel}, ${b.time}` };
    case 'on_the_way':
      return { title: `${firstName} is on the way`, sub: 'Arrives in about 12 min' };
    case 'in_progress':
      return { title: 'Job in progress', sub: `About ${b.hours} hrs, started 10:02 AM` };
    case 'completed':
      return { title: 'Job completed', sub: 'Rate your pro and add a tip' };
  }
}

export const isUpcoming = (b: Booking) => b.status !== 'completed';

export function filterProviders(list: Provider[], categoryId: string, f: Filters): Provider[] {
  return list
    .filter((p) => p.categoryId === categoryId)
    .filter((p) => (!f.availableToday || p.availableToday) && (!f.topRated || p.rating >= 4.8) && (!f.under40 || p.rate < 40) && (!f.eco || p.eco))
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews || a.distance - b.distance);
}

export function searchProviders(list: Provider[], q: string): Provider[] {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((p) => p.name.toLowerCase().includes(s) || p.service.toLowerCase().includes(s) || p.categoryId.includes(s));
}
