/// <reference types="node" />
import assert from 'node:assert/strict';
import test from 'node:test';
import { money, quote, tipTotal } from './pricing.ts';

const codes = { SPRING20: 0.2 };

test('deep clean with SPRING20 matches the checkout design', () => {
  assert.deepEqual(quote(140, 'SPRING20', codes), { subtotal: 140, fee: 7, discount: 28, total: 119, promo: 'SPRING20' });
});

test('unknown promo gives no discount', () => {
  const q = quote(70, 'NOPE', codes);
  assert.equal(q.discount, 0);
  assert.equal(q.total, 73.5);
  assert.equal(q.promo, undefined);
});

test('promo code is case-insensitive', () => {
  assert.equal(quote(100, ' spring20 ', codes).total, 85);
});

test('tip and money format', () => {
  assert.equal(tipTotal(119, 10), 129);
  assert.equal(tipTotal(119, -5), 119);
  assert.equal(money(1284.5), '$1,284.50');
});
