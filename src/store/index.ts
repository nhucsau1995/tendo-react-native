import { create } from 'zustand';
import type { Booking, Conversation, Filters, JobRequest, Message } from '../data/models';
import { customer, days, mariaThread, promoCodes, providers, seedBookings, seedConversations, seedRequests } from '../data/seed';
import { advance, STATUS_STEPS } from '../logic/booking';
import { quote } from '../logic/pricing';

// Simulated clock for the lifecycle events (requested 9:02 AM ... completed 2:04 PM).
const STEP_TIMES = ['9:02 AM', '9:05 AM', '9:41 AM', '10:02 AM', '2:04 PM'];

export type Draft = { providerId: string; packageId: string; dayKey: string; time: string; notes: string; promo: string };

type State = {
  role: 'customer' | 'provider';
  filters: Filters;
  draft: Draft;
  bookings: Booking[];
  conversations: Conversation[];
  requests: JobRequest[];
  online: boolean;
  nextId: number;
  signIn: () => void;
  signUp: () => void;
  toggleFilter: (k: keyof Filters) => void;
  startDraft: (providerId: string) => void;
  updateDraft: (patch: Partial<Draft>) => void;
  confirmBooking: () => string;
  advanceBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
  rateBooking: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  markRead: (conversationId: string) => void;
  respond: (requestId: string, accept: boolean) => void;
  setOnline: (v: boolean) => void;
  setRole: (r: 'customer' | 'provider') => void;
};

const noFilters: Filters = { availableToday: true, topRated: false, under40: false, eco: false };
const emptyDraft: Draft = { providerId: 'maria', packageId: 'deep', dayKey: 'sat14', time: '10:00 AM', notes: 'Please focus on kitchen and bathroom', promo: 'SPRING20' };

let msgSeq = 0;
const msg = (from: Message['from'], text: string, at: string): Message => ({ id: `m${++msgSeq}`, from, text, at });

export const useStore = create<State>((set, get) => ({
  role: 'customer',
  filters: noFilters,
  draft: emptyDraft,
  bookings: seedBookings,
  conversations: seedConversations,
  requests: seedRequests,
  online: true,
  nextId: 20481,

  // Existing account: seeded history. New account: first-run, nothing booked yet.
  signIn: () => set({ bookings: seedBookings, conversations: seedConversations, role: 'customer' }),
  signUp: () => set({ bookings: [], conversations: seedConversations.filter((c) => c.id === 'c-support'), role: 'customer' }),

  toggleFilter: (k) => set((s) => ({ filters: { ...s.filters, [k]: !s.filters[k] } })),

  startDraft: (providerId) => {
    const p = providers.find((x) => x.id === providerId)!;
    const pkg = p.packages.find((x) => x.id === 'deep') ?? p.packages[0];
    set({ draft: { ...emptyDraft, providerId, packageId: pkg.id } });
  },
  updateDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),

  confirmBooking: () => {
    const { draft, nextId } = get();
    const p = providers.find((x) => x.id === draft.providerId)!;
    const pkg = p.packages.find((x) => x.id === draft.packageId)!;
    const day = days.find((d) => d.key === draft.dayKey)!;
    const q = quote(pkg.price, draft.promo, promoCodes);
    const id = `TD-${nextId}`;
    const booking: Booking = {
      id, providerId: p.id, packageId: pkg.id, serviceName: pkg.name, hours: pkg.hours, dateLabel: day.label, time: draft.time,
      address: customer.address, notes: draft.notes, subtotal: q.subtotal, total: q.total, promo: q.promo,
      status: 'requested', events: [{ status: 'requested', at: STEP_TIMES[0] }],
    };
    // The pro replies in chat right away (simulated other side).
    const convo: Conversation = {
      id: `c-${p.id}`, providerId: p.id, title: p.name, avatar: p.avatar, bookingId: id, unread: 2, when: '9:48 AM',
      messages: mariaThread.map((m, i) => msg(m.from, m.text.replace('Maria', p.firstName), `9:${42 + i} AM`)),
    };
    set((s) => ({
      bookings: [booking, ...s.bookings],
      conversations: [convo, ...s.conversations.filter((c) => c.id !== convo.id)],
      nextId: s.nextId + 1,
    }));
    return id;
  },

  advanceBooking: (id) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? advance(b, STEP_TIMES[Math.min(STATUS_STEPS.indexOf(b.status) + 1, 4)]) : b)),
    })),
  cancelBooking: (id) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
  rateBooking: (id) => set((s) => ({ bookings: s.bookings.map((b) => (b.id === id ? { ...b, rated: true } : b)) })),

  sendMessage: (conversationId, text) => {
    set((s) => ({
      conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, when: 'Now', messages: [...c.messages, msg('me', text, 'Now')] } : c)),
    }));
    // Simulated reply from the pro after a short pause.
    setTimeout(() => {
      set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === conversationId ? { ...c, messages: [...c.messages, msg('them', replyTo(text), 'Now')] } : c,
        ),
      }));
    }, 1200);
  },
  markRead: (conversationId) => set((s) => ({ conversations: s.conversations.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c)) })),

  respond: (requestId, accept) =>
    set((s) => ({ requests: s.requests.map((r) => (r.id === requestId ? { ...r, state: accept ? 'accepted' : 'declined' } : r)) })),
  setOnline: (online) => set({ online }),
  setRole: (role) => set({ role }),
}));

function replyTo(text: string) {
  const t = text.toLowerCase();
  if (t.includes('late')) return 'All on time, see you soon!';
  if (t.includes('address')) return 'Got it, thank you!';
  if (t.includes('thank')) return 'You are welcome!';
  return 'Sounds good, thanks Emma!';
}
