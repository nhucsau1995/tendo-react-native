import type { Booking, Category, Conversation, JobRequest, Provider } from './models';

export const customer = {
  name: 'Emma Carter',
  firstName: 'Emma',
  email: 'emma.carter@mail.com',
  phone: '+1 (415) 555-0142',
  since: 2024,
  area: 'Mission District, San Francisco',
  address: '2145 Valencia St, Apt 3, San Francisco',
  card: 'Visa ending 4242',
};

export const categories: Category[] = [
  { id: 'cleaning', name: 'Cleaning', icon: 'droplet' },
  { id: 'plumbing', name: 'Plumbing', icon: 'tool' },
  { id: 'electrical', name: 'Electrical', icon: 'zap' },
  { id: 'handyman', name: 'Handyman', icon: 'settings' },
  { id: 'moving', name: 'Moving', icon: 'truck' },
  { id: 'beauty', name: 'Beauty', icon: 'scissors' },
];

const cleaningPackages = (std: number, deep: number, move: number) => [
  { id: 'standard', name: 'Standard clean', hours: 2, price: std },
  { id: 'deep', name: 'Deep clean', hours: 4, price: deep },
  { id: 'moveout', name: 'Move-out clean', hours: 5, price: move },
];

export const providers: Provider[] = [
  {
    id: 'maria',
    name: 'Maria Lopez',
    firstName: 'Maria',
    service: 'House cleaning',
    categoryId: 'cleaning',
    rating: 4.9,
    reviews: 212,
    rate: 35,
    distance: 1.2,
    nextSlot: 'Today 2:00 PM',
    availableToday: true,
    eco: true,
    years: 6,
    jobs: 212,
    onTime: 98,
    avatar: 'avatarMaria',
    portrait: 'mariaPortrait',
    cover: 'coverKitchen',
    work: ['workBathroom', 'workLiving', 'workOven'],
    packages: cleaningPackages(70, 140, 175),
    review: { author: 'Olivia P.', stars: 5, text: 'Spotless and right on time.', when: '2 days ago' },
  },
  {
    id: 'aisha',
    name: 'Aisha Rahman',
    firstName: 'Aisha',
    service: 'House cleaning',
    categoryId: 'cleaning',
    rating: 4.8,
    reviews: 95,
    rate: 32,
    distance: 2.0,
    nextSlot: 'Today 4:00 PM',
    availableToday: true,
    eco: false,
    years: 4,
    jobs: 140,
    onTime: 96,
    avatar: 'avatarAisha',
    work: ['workLiving', 'workBathroom'],
    packages: cleaningPackages(64, 128, 160),
    review: { author: 'Ben T.', stars: 5, text: 'Kind, fast and very careful with our floors.', when: '1 week ago' },
  },
  {
    id: 'daniel',
    name: 'Daniel Kim',
    firstName: 'Daniel',
    service: 'House cleaning',
    categoryId: 'cleaning',
    rating: 4.7,
    reviews: 64,
    rate: 30,
    distance: 3.4,
    nextSlot: 'Tomorrow 9:00 AM',
    availableToday: false,
    eco: true,
    years: 3,
    jobs: 88,
    onTime: 94,
    avatar: 'avatarDaniel',
    work: ['workOven', 'workLiving'],
    packages: cleaningPackages(60, 120, 150),
    review: { author: 'Priya S.', stars: 5, text: 'Great with the details, the oven looks new.', when: '3 weeks ago' },
  },
  {
    id: 'sofia',
    name: 'Sofia Rossi',
    firstName: 'Sofia',
    service: 'House cleaning',
    categoryId: 'cleaning',
    rating: 4.9,
    reviews: 130,
    rate: 40,
    distance: 0.8,
    nextSlot: 'Today 12:00 PM',
    availableToday: true,
    eco: true,
    years: 7,
    jobs: 260,
    onTime: 99,
    avatar: 'avatarSofia',
    work: ['workBathroom', 'workOven'],
    packages: cleaningPackages(80, 160, 200),
    review: { author: 'Mark D.', stars: 5, text: 'Booked her again, always perfect.', when: '5 days ago' },
  },
  {
    id: 'james',
    name: 'James Okafor',
    firstName: 'James',
    service: 'Plumber',
    categoryId: 'plumbing',
    rating: 4.8,
    reviews: 168,
    rate: 55,
    distance: 2.3,
    nextSlot: 'Tomorrow 3:00 PM',
    availableToday: false,
    eco: false,
    years: 11,
    jobs: 410,
    onTime: 97,
    avatar: 'avatarJames',
    portrait: 'jamesPortrait',
    work: ['workBathroom'],
    packages: [
      { id: 'leak', name: 'Leaky sink repair', hours: 1, price: 85 },
      { id: 'drain', name: 'Drain unclog', hours: 1, price: 95 },
      { id: 'heater', name: 'Water heater check', hours: 2, price: 150 },
    ],
    review: { author: 'Hannah W.', stars: 5, text: 'Fixed the leak in 20 minutes, explained everything.', when: '1 week ago' },
  },
];

export const featured = ['maria', 'james'];

// Days shown on the booking date strip (Thu Nov 12 to Wed Nov 18).
export const days = [
  { key: 'thu12', weekday: 'Thu', day: 12, label: 'Thu, Nov 12' },
  { key: 'fri13', weekday: 'Fri', day: 13, label: 'Fri, Nov 13' },
  { key: 'sat14', weekday: 'Sat', day: 14, label: 'Sat, Nov 14' },
  { key: 'sun15', weekday: 'Sun', day: 15, label: 'Sun, Nov 15' },
  { key: 'mon16', weekday: 'Mon', day: 16, label: 'Mon, Nov 16' },
  { key: 'tue17', weekday: 'Tue', day: 17, label: 'Tue, Nov 17' },
  { key: 'wed18', weekday: 'Wed', day: 18, label: 'Wed, Nov 18' },
];

export const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

// Slots already taken, per day key.
export const fullSlots: Record<string, string[]> = { sat14: ['4:00 PM'], sun15: ['8:00 AM'], thu12: ['10:00 AM', '12:00 PM'] };

export const seedBookings: Booking[] = [
  {
    id: 'TD-20412',
    providerId: 'james',
    packageId: 'leak',
    serviceName: 'Leaky sink repair',
    hours: 1,
    dateLabel: 'Tue, Nov 17',
    time: '3:00 PM',
    address: '2145 Valencia St, Apt 3',
    notes: '',
    subtotal: 85,
    total: 89.25,
    status: 'requested',
    events: [{ status: 'requested', at: 'Nov 8, 6:12 PM' }],
  },
  {
    id: 'TD-20377',
    providerId: 'sofia',
    packageId: 'standard',
    serviceName: 'Standard clean',
    hours: 2,
    dateLabel: 'Fri, Nov 27',
    time: '9:00 AM',
    address: '2145 Valencia St, Apt 3',
    notes: '',
    subtotal: 80,
    total: 84,
    status: 'accepted',
    events: [{ status: 'requested', at: 'Nov 6, 9:30 AM' }, { status: 'accepted', at: 'Nov 6, 9:41 AM' }],
  },
  {
    id: 'TD-19820',
    providerId: 'aisha',
    packageId: 'standard',
    serviceName: 'Standard clean',
    hours: 2,
    dateLabel: 'Sat, Oct 24',
    time: '10:00 AM',
    address: '2145 Valencia St, Apt 3',
    notes: '',
    subtotal: 64,
    total: 67.2,
    status: 'completed',
    rated: true,
    events: [{ status: 'requested' }, { status: 'accepted' }, { status: 'on_the_way' }, { status: 'in_progress' }, { status: 'completed', at: 'Oct 24, 12:06 PM' }],
  },
];

export const seedConversations: Conversation[] = [
  {
    id: 'c-james',
    providerId: 'james',
    title: 'James Okafor',
    avatar: 'avatarJames',
    unread: 0,
    when: 'Yesterday',
    messages: [
      { id: 'j1', from: 'me', text: 'Hi James, the kitchen sink drips all night.', at: '5:58 PM' },
      { id: 'j2', from: 'them', text: 'I can come Tuesday after 3', at: '6:20 PM' },
    ],
  },
  {
    id: 'c-sofia',
    providerId: 'sofia',
    title: 'Sofia Rossi',
    avatar: 'avatarSofia',
    unread: 0,
    when: 'Mon',
    messages: [{ id: 's1', from: 'them', text: 'Thanks for booking again!', at: '9:42 AM' }],
  },
  {
    id: 'c-support',
    title: 'Tendo Support',
    unread: 0,
    when: 'Nov 2',
    messages: [{ id: 'x1', from: 'them', text: 'Your promo SPRING20 is active', at: '10:00 AM' }],
  },
];

// The Maria thread used once Emma books her (replayed by the simulated chat).
export const mariaThread = [
  { from: 'them' as const, text: 'Hi Emma! I will bring eco-friendly products. Any pets at home?' },
  { from: 'me' as const, text: 'Yes, one friendly cat named Miso' },
  { from: 'them' as const, text: 'No problem. Is street parking OK?' },
  { from: 'me' as const, text: 'Yes, there is a spot right in front' },
  { from: 'them' as const, text: 'Great, see you Saturday at 10' },
];

export const quickReplies = ['Thanks!', 'Running late?', 'Send address'];

export const seedRequests: JobRequest[] = [
  { id: 'r-emma', customer: 'Emma Carter', avatar: 'avatarEmma', service: 'Deep clean', when: 'Sat, Nov 14, 10:00 AM', distance: 1.2, price: 140, hours: 4, tag: 'Repeat client', state: 'new' },
  { id: 'r-noah', customer: 'Noah Bennett', avatar: 'avatarNoah', service: 'Standard clean', when: 'Sun, Nov 15, 1:00 PM', distance: 2.6, price: 70, hours: 2, tag: 'New client', state: 'new' },
];

export const providerToday = { customer: 'Liam Chen', avatar: 'avatarLiam' as const, service: 'Move-out clean', time: '3:00 PM' };

export const providerWeek = { earnings: 1284.5, jobs: 18, rating: 4.9, range: 'Nov 9 - 15' };

export const promoCodes = { SPRING20: 0.2 } as Record<string, number>;
