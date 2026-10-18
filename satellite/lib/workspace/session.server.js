import { cookies } from 'next/headers';
import {
  activateSwarmUiApp,
  activateSwarmUiWorkspace,
} from '@/lib/sui/activation';
import {
  ensurePersonalWorkspace,
  fetchMyWorkspaces,
  pickDefaultWorkspaceId,
} from '@/lib/workspace/workspace-queries';

export const WORKSPACE_COOKIE = 'swarmui_workspace_id';

export async function readRequestedWorkspaceId() {
  const cookieStore = await cookies();
  return cookieStore.get(WORKSPACE_COOKIE)?.value ?? null;
}

export async function persistWorkspaceIdCookie(workspaceId) {
  const cookieStore = await cookies();
  try {
    cookieStore.set(WORKSPACE_COOKIE, workspaceId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  } catch {
    /* cookie writes only in Route Handlers */
  }
}

export async function establishProductSession(supabase, user, options = {}) {
  const accessToken = options.accessToken ?? null;
  const activationKind = options.activationKind ?? 'sign_in';
  const requested =
    options.requestedWorkspaceId ?? (await readRequestedWorkspaceId());

  const meta = user.user_metadata ?? {};
  const displayName =
    (typeof meta.full_name === 'string' && meta.full_name) ||
    (typeof meta.name === 'string' && meta.name) ||
    user.email?.split('@')[0] ||
    'Creator';

  let workspaces = await fetchMyWorkspaces(supabase, user.id);
  if (!workspaces.length) {
    const personalId = await ensurePersonalWorkspace(supabase, user.id, displayName);
    if (personalId) {
      workspaces = await fetchMyWorkspaces(supabase, user.id);
    }
  }

  let resolvedId = null;
  if (requested && workspaces.some((w) => w.id === requested)) {
    resolvedId = requested;
  } else {
    resolvedId = pickDefaultWorkspaceId(workspaces);
  }

  if (resolvedId && options.persistCookie !== false) {
    await persistWorkspaceIdCookie(resolvedId);
  }

  if (resolvedId) {
    const wsKind = activationKind === 'sso_launch' ? 'sso_launch' : activationKind;
    await activateSwarmUiWorkspace(supabase, user.id, resolvedId, accessToken, wsKind);
  }

  await activateSwarmUiApp(supabase, user.id, accessToken, activationKind);

  return {
    workspaceId: resolvedId,
    workspaces,
  };
}
