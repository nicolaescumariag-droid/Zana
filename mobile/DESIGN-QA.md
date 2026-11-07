# Zana mobile — design QA notes

Visual source of truth: Figma file `Eo7DWsANnIc4IbnsYmrZX9`, section `881:3355` (56 approved frames).
QA was done on Expo Web at 390×844 against Figma frame exports, side by side. iOS was not run; Android was not run in this pass.
Nothing here is claimed pixel-perfect.

## Open decisions (inert until decided)

| Item | Current behaviour |
| --- | --- |
| Chat chips "Upload my health records", "Understand a medical result" | Open Upload files (D05, 881:4718); back returns to Zana Chat |
| Home screening rows (994:6213) | Do nothing; "Find clinic for appointment" opens Find a Clinic |
| Home chat input | Accepts typing; Send disabled; no AI |
| Upcoming plan items (B12) | Do nothing |
| Calendar / "Booked" / date-change actions (C02–C06, F08 "Add to Calendar") | Do nothing |
| "Add result" (C04–C07), social sign-in, cycle-app connect | Do nothing |
| Clinic "Available Services", "Opening Hours", Map toggle | Do nothing (not designed) |
| Settings rows (G01) except notification toggles and Log Out | Do nothing (not designed) |
| Screening catalogue selections (C03) | Kept in local state while the app is open; no reminder is created and no due date assigned. Whether a pick should become a reminder, and with what date, is unresolved. |
| Chat history (not in Figma) | Zana Chat menu icon opens "Your chats" (`/chat/history`), listing example chats and AI outputs. The AI summary lives under Zana Chat (`/chat/summary`); "Explain this document with AI" in Folders opens it there, and closing returns to Zana Chat. Layout uses existing styles; no Figma frame. |
| AI Summary save (E01) | Added on request (not in Figma): "Save information" button; changes to "Saved" but stores nothing. |
| Folder limit (D02) | Up to 3 folders can be chosen; other options are disabled once 3 are ticked. More than 3 would be paid, but there is no paid/upgrade design, so nothing is shown. |
| Mock user name | Home uses "Cleo", other frames "Sophia", as in Figma |

## Navigation change (after approval review)

- Home tab shows "04 Home - Existing User 0 of 5 Duplicate" (`994:6213`), which is outside the approved section `881:3355`.
- The centre heart opens Zana Chat (`881:4014`, route `/chat`); the guided plan moved to `/chat/plan/[step]`.
- Home copy is verbatim from Figma, including "We 22" (no 21), "Fi" and the repeated "Thyroid check" row; all values are static mocks.
- The Home cycle art (blurred gradient) is a PNG rendered from the Figma SVG, because react-native-svg does not support its filters.

## Mocked behaviour

- All data is local (`src/mocks/*`); state lives in `src/state/AppState.tsx` and resets on reload.
- Upload, camera, location permission (F04) and the AI summary (E01) are UI mocks. No file, camera or location API is called.
- "Visit website to book" (F06) opens the "You made your appointment?" sheet (F07) directly, because there is no real clinic website.

## Known visual differences

- Fonts render slightly differently on web; line breaks can differ from Figma by a word.
- Records folder cards (D03): layering/proportions of the card artwork are approximate.
- Upload sheet (D05/D06) and AI summary (E01): spacing differs slightly; "Zana AI" logo is a smaller asset.
- Some folder illustrations reuse the nearest exported Figma group (e.g. Eye & Vision reuses Endocrinology art).
- Account header (G01) gradient is more purple than the Figma pink/purple blend.
- F02 shows the platform keyboard instead of the Figma iOS keyboard; on web the input shows a focus outline.
- F04 is drawn in-app to match Figma; real builds would show the OS dialog.

## Not yet verified

- Android emulator and physical iOS devices.
- Dynamic type / text scaling up to 200%.
- Screen-reader walkthrough (roles and labels are set on interactive elements but not audited).
