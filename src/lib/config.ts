let config: { SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string } = {};

try {
  // Will exist if user copies config.example.json -> config.json
  // Using require to avoid static import errors if file isn't present.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  config = require('./config.json');
} catch (e) {
  // No config.json present; mock mode
}

export const SUPABASE_URL = config.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY || '';

export const IS_SUPABASE_ENABLED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
