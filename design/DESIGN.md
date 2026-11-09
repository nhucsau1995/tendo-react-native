# Tendo Design System

Bright, warm, trustworthy mobile app for booking local home-service pros (cleaning, plumbing, electrical, handyman, moving, beauty). Light theme, photo-led, clear CTAs.

## Color (use ONLY these colors; no default violet or indigo, no flat neutral grey)
- Background: #FCF4F5 (tinted near-white)
- Surface (cards, sheets): #FFFFFF; Surface alt (grouped rows): #F8EAEC
- Accent (bright, large fills, icons, active states, big numerals): #E60023
- Accent fill (any button or chip with a WHITE label, links, chip text on tint): #CD001E; pressed #CA001F
- Accent tint (selected states, chip fills): #FCDBE0
- Support (decoration, illustration accents, eco tags with dark text): #5CC8A8; support strong (chart lines, icons): #38A685
- Text primary #1F0C0F, secondary #5A4549, tertiary #7A6468
- Hairline divider #EADADC; input and control borders #B4898B
- Status (text on tint): success #0E7C3A on #E3F4E9, warning #A75906 on #FAEFE1, danger #B91C1C on #F7E4E4, info #CD001E on #F9E0E4
- Rating stars: #D97706 amber fill
- Hero gradient (any surface carrying white text): #CD001E -> #CA001F. A soft accent -> support blend is decoration only, never behind text.

## Typography
- UI and body family: Rubik. Display family (screen titles, hero headlines, big totals only): Young Serif.
- Display 32 / 400 Young Serif, -0.01em
- Title 20 / 600 Rubik
- Body 16 / 400 Rubik
- Label 14 / 500 Rubik (buttons, tabs)
- Caption 13 / 500 Rubik (metadata, secondary color)
- Use only these 5 sizes. Minimum text 12px (13px chips and tags, 14px safety or legal text).

## Frame and layout
- 393x852 mobile frame. Keep top ~59px (status bar) and bottom ~34px (home indicator) clear of tappable content.
- 8pt spacing (4, 8, 12, 16, 24, 32), screen edge padding 20px, generous vertical rhythm.
- Radius: card 20, control 14, input 12, pill 999.
- Elevation: soft only, card = 0 1px 2px rgba(31,12,15,.04) + 0 8px 24px rgba(31,12,15,.06). No hard or black shadows.
- Icons: one set only, Lucide-style rounded outline, 24px, 1.75 stroke. Do not mix filled and outline.

## Controls (one spec each, reused on every screen)
- Primary button: pill, 56px tall, fill #CD001E, white 14/500 label; pressed #CA001F; disabled 40% opacity.
- Secondary button: pill, white fill, 1.5px #B4898B border, ink label.
- Text input: 12px radius, 52px tall, white, 1px #B4898B border; focus = 2px #CD001E ring; error = #B91C1C border + 13px helper.
- Card: white, 20px radius, soft shadow.
- Chip: pill, 32px tall, #FCDBE0 fill, #CD001E 13px label; selected chip = #CD001E fill with white label. Chips on a gradient use a dark translucent fill with white text, never white fill.
- Status chip: statusOn text on its tint (Accepted = success, Requested = warning).
- Rating: small amber star + number in text primary.

## Shared components
- Bottom tab bar (exactly 4 tabs, left to right): Home (home icon), Bookings (calendar icon), Inbox (message-circle icon), Profile (user icon). Flat white bar, 1px #EADADC top border, no gradient. Active tab: icon + label in #CD001E with a small #FCDBE0 pill behind the icon. Inactive: #5A4549. Never rename, reorder, add or remove tabs.
- Header (tab screens): title or greeting on the left in Display style, bell icon button or avatar on the right.

## Focal element
One bold focal element per screen (promo hero card, best-match provider card, total block, status card, earnings card). Everything else stays quiet.

## Imagery
Real photography only: provider portraits, homes, clean rooms, tools, hero and empty states. NO 3D renders, claymorphism, isometric, CGI or glossy plastic objects.

## Meaning of color
The brand accent is crimson; errors and destructive actions use danger #B91C1C with an icon or text label so they never read as brand. Non-urgent flags use the warning color with an icon.

## Copy scope
English, US. Do not mention: crypto, insurance claim, guaranteed, background check, subscription, premium. No invented integrations. People names only: Emma Carter, Maria Lopez, James Okafor, Aisha Rahman, Daniel Kim, Sofia Rossi, Olivia P., Noah Bennett, Liam Chen.
