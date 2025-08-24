# Money Tug-of-War (Expo + TypeScript)

A fun, polished 2-friend productivity accountability app. Duolingo + Habitica vibes with a clean UI.
No real money transfers — virtual balances only.

## Features
- **Rope Tug Home**: Animated rope & money bag shifting based on balance. Haptics on wins/losses.
- **Onboarding & Pairing**: Create a profile, generate/join an invite code.
- **Tasks**: Quick add (supports simple natural language like `Gym 7pm daily`), categories, deadlines.
- **Completion**: One-tap ✅, optional photo proof (placeholder to keep deps light), Pomodoro timer.
- **History / Weekly Recap**: Balance swings, category breakdown, weekly "Settle Up" with confetti (placeholder).
- **Smart Nudges**: Friendly, contextual reminders (scaffolded; enable notifications if desired).
- **Dark Mode**: Auto via system preference.
- **Optional Supabase**: Realtime sync & auth wiring scaffolded.

> This repo ships with **local mock storage by default**. Supabase is optional — wire it in `src/lib/config.ts` + `src/lib/supabase.ts` and follow `supabase/schema.sql`.

## Quick Start

```bash
# 1) Install deps
npm install

# 2) Run in Expo
npm start
```

Open in Expo Go (iOS/Android).

## Optional: Supabase Setup

1. Create a new Supabase project.
2. In the project, create a Storage bucket named `proofs` (public).
3. Run the SQL in `supabase/schema.sql` (Tables: `pairs`, `pair_members`, `tasks`, `completions`, `events`). 
4. Copy `config.example.json` to `src/lib/config.json` and fill in:
   ```json
   {
     "SUPABASE_URL": "https://YOUR_PROJECT.supabase.co",
     "SUPABASE_ANON_KEY": "YOUR_ANON_KEY"
   }
   ```
5. In-app, go to **Pairing** to generate or join an invite code.
6. Realtime sync is enabled if Supabase keys are present.

## Notes
- QR and Photos are scaffolded with a "coming soon" dialog to keep the base app dependency-light and fully runnable.
- To enable photos: `npx expo install expo-image-picker`
- To enable push/local notifications: `npx expo install expo-notifications`
- You can later swap the custom tabs with `@react-navigation` if you prefer.

## Scripts
- `npm start` – launch Metro bundler
- `npm run android` / `npm run ios` – build native app (requires local toolchains)
- `npm run web` – run in the web browser

## License
MIT
