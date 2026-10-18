/** OWeb ecosystem app id (must match control-plane `ecosystem-apps.ts` when registered). */
export const SWARMUI_APP_ID =
  process.env.NEXT_PUBLIC_OWEB_APP_ID || process.env.OWEB_APP_ID || 'swarmui';

export const SUPABASE_AUTH_STORAGE_KEY = 'ao-supabase-auth';

export const OWEB_ORIGIN = 'https://oweb.one';

export function getOwebAppUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_OWEB_APP_URL || process.env.OWEB_APP_URL;
  return (fromEnv || OWEB_ORIGIN).replace(/\/$/, '');
}

export function getOwebPlatformApiUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_OWEB_PLATFORM_API_URL || process.env.OWEB_PLATFORM_API_URL;
  return (fromEnv || `${getOwebAppUrl()}/api/v1`).replace(/\/$/, '');
}

export function getAppPublicUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  return (fromEnv || 'http://localhost:3000').replace(/\/$/, '');
}

export function getSwarmUiBackendUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SWARMUI_BACKEND_URL || process.env.SWARMUI_BACKEND_URL;
  return fromEnv ? fromEnv.replace(/\/$/, '') : '';
}

export function owebLoginUrl(options = {}) {
  const url = new URL('/login', getOwebAppUrl());
  if (options.launch !== false) {
    url.searchParams.set('launch', SWARMUI_APP_ID);
  }
  if (options.redirect) {
    url.searchParams.set('redirect', options.redirect);
  }
  return url.toString();
}

export function owebSignupUrl() {
  const url = new URL('/signup', getOwebAppUrl());
  url.searchParams.set('launch', SWARMUI_APP_ID);
  return url.toString();
}

export function isAuthRequired() {
  const flag =
    process.env.NEXT_PUBLIC_SWARMUI_REQUIRE_AUTH || process.env.SWARMUI_REQUIRE_AUTH;
  if (flag === 'true' || flag === '1') return true;
  if (flag === 'false' || flag === '0') return false;
  return process.env.NODE_ENV === 'production';
}
