# Tendo - Source Brief

## Title

Tendo - on-demand home services marketplace

## Description

Tendo lets a customer book a vetted local pro for home services in a few taps. They browse six categories, compare pros with filters and a best-match pick, open a pro's profile (rating, jobs done, on-time rate, packages, recent work, reviews), choose a package, date and time slot, and check out with a clear price breakdown (service fee, promo code) and payment only after the job is done. After booking they follow the job live through requested, accepted, on the way, in progress and completed, chat with the pro, and rate and tip at the end. A provider mode shows the other side: a pro goes online, sees weekly earnings and accepts or declines incoming job requests.

This repo is the mobile slice of a larger marketplace (customer app, provider app, admin and website). It proves the core loop in one app and simulates the provider side behind a tap.

## Store links

Not yet published (portfolio proof of concept).

## Platform

Android demo, iOS-ready codebase (Expo, React Native). The same code also runs on the web through Expo.

## Category

Lifestyle / Home services marketplace

## Features

- Welcome and sign-up with a customer or provider role and phone number
- Home with search, promo card, six service categories and top-rated pros
- Category results with filter chips (available today, top rated, under $40/hr, eco products) and a best-match card
- Provider profile with verified badge, stats, service packages, recent work and a review
- Booking: package, 7-day date strip, time slots with full slots disabled, address and notes
- Checkout: 5% service fee, SPRING20 promo, total, pay after the job
- Live job timeline with event times; pro updates simulated behind a tap
- Chat pinned to the booking, quick replies, simulated pro replies
- Inbox with unread badges and search
- Bookings: upcoming and past, first-run empty state
- Rate and tip after completion
- Profile with a switch to provider mode
- Provider mode: online toggle, weekly earnings, accept or decline requests, today's schedule

## Tech stack

- Expo SDK 58, React Native, TypeScript, Expo Router
- Zustand for state (booking draft, lifecycle, chats, provider requests)
- Unit tests with `node --test` for pricing and booking rules
- Rubik + Young Serif via `@expo-google-fonts`, Feather icons
- Capture: GitHub Actions Android emulator + Maestro flows, ffmpeg GIF
- Stack reason: the job names no stack and asks for iOS, Android and a website, so the account default (Expo/React Native + Zustand + TypeScript) fits: one codebase for both phone platforms and the web.

## Industry

Home services, on-demand marketplaces (two-sided: customers and service pros).

## Metrics

Unpublished proof of concept: no users or store metrics. No target numbers were given.

## Research notes

- Verified: every screen runs in a release build on an Android emulator (see the demo GIF and screenshots); checkout math and the booking lifecycle are covered by unit tests.
- Assumed: the job post had only a title (on-demand service marketplace for web, iOS and Android), so the service categories, packages, pricing (5% fee), promo and booking lifecycle are reasonable defaults, not client requirements.
- Mocked: pros, prices, chats and earnings are seed data; payment, maps, push notifications, OTP and the backend are simulated.
- Next steps: separate provider app (onboarding, documents, payouts), admin panel (pros, disputes, refunds), website for booking, real backend (auth, bookings API, realtime status over websockets), payments with hold-and-capture, maps with live ETA, push notifications.
- Capture: run 42568408305 on GitHub Actions (release APK, API 34 Pixel 6 emulator, Maestro): 10 screenshots and a 32 s demo GIF. Runs 1 and 2 failed before the app build because services.gradle.org timed out / returned 504 for the Gradle zip; the workflow now retries from a mirror pinned to the official SHA-256.
- Design QA: 97/100 (grade A, marketplace profile), no Critical or Major findings.
- Known issues (Minor, from the design QA): the kitchen cover photo has a small baked-in card with wrong copy at its top edge; the home booking strip wraps the time onto a second line; "See all" on Categories has no action; the welcome photo shows an invented logo on the cleaner's shirt; "Simulate pro update" (a demo control) takes the footer slot on the tracking screen.
