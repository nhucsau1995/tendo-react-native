/// <reference types="node" />
import assert from 'node:assert/strict';
import test from 'node:test';
import type { Booking, Provider } from '../data/models.ts';
import { advance, filterProviders, headline, stepState } from './booking.ts';

const base: Booking = {
  id: 'TD-1', providerId: 'maria', packageId: 'deep', serviceName: 'Deep clean', hours: 4, dateLabel: 'Sat, Nov 14', time: '10:00 AM',
  address: 'x', notes: '', subtotal: 140, total: 119, status: 'requested', events: [{ status: 'requested', at: '9:02 AM' }],
};

test('advance walks the lifecycle and stops at completed', () => {
  let b = base;
  for (const at of ['9:05 AM', '9:41 AM', '10:02 AM', '2:04 PM', '3:00 PM']) b = advance(b, at);
  assert.equal(b.status, 'completed');
  assert.equal(b.events.length, 5);
  assert.equal(b.events[2].status, 'on_the_way');
});

test('timeline step states', () => {
  const b = advance(advance(base, '9:05 AM'), '9:41 AM');
  assert.equal(stepState(b, 'requested'), 'done');
  assert.equal(stepState(b, 'on_the_way'), 'current');
  assert.equal(stepState(b, 'completed'), 'pending');
  assert.equal(headline(b, 'Maria').title, 'Maria is on the way');
});

const p = (id: string, rating: number, rate: number, today: boolean, eco: boolean, distance = 1): Provider => ({
  id, name: id, firstName: id, service: 'House cleaning', categoryId: 'cleaning', rating, reviews: 1, rate, distance, nextSlot: '', availableToday: today,
  eco, years: 1, jobs: 1, onTime: 90, avatar: 'avatarMaria', work: [], packages: [], review: { author: '', stars: 5, text: '', when: '' },
});

test('filters combine and best rating sorts first', () => {
  const list = [p('a', 4.7, 30, false, true), p('b', 4.9, 35, true, true), p('c', 4.8, 45, true, false)];
  const none = { availableToday: false, topRated: false, under40: false, eco: false };
  assert.deepEqual(filterProviders(list, 'cleaning', none).map((x) => x.id), ['b', 'c', 'a']);
  assert.deepEqual(filterProviders(list, 'cleaning', { ...none, availableToday: true, under40: true }).map((x) => x.id), ['b']);
  assert.equal(filterProviders(list, 'plumbing', none).length, 0);
});
