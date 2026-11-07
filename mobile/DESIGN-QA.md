# Zana mobile — design QA notes

Visual source of truth: Figma file `Eo7DWsANnIc4IbnsYmrZX9`, section `881:3355` (56 approved frames).
QA was done on Expo Web at 390×844 against Figma frame exports, side by side. iOS was not run; Android was not run in this pass.
Nothing here is claimed pixel-perfect.

## Open decisions (inert until decided)

| Item | Current behaviour |
| --- | --- |
| Home chips "Upload my health records", "Understand a medical result" | Do nothing |
| Bottom-nav centre heart | Does nothing |
| Home chat input | Accepts typing; Send disabled; no AI |
| Upcoming plan items (B12) | Do nothing |
| Calendar / "Booked" / date-change actions (C02–C06, F08 "Add to Calendar") | Do nothing |
| "Add result" (C04–C07), social sign-in, cycle-app connect | Do nothing |
| Clinic "Available Services", "Opening Hours", Map toggle | Do nothing (not designed) |
| Settings rows (G01) except notification toggles and Log Out | Do nothing (not designed) |
| Mock user name | Home uses "Cleo", other frames "Sophia", as in Figma |

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
