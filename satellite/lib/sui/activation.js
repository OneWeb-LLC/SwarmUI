import { SWARMUI_APP_ID, getOwebPlatformApiUrl } from '@/lib/sui/constants';

export async function activateSwarmUiApp(supabase, userId, accessToken, activationKind) {
  const kind = activationKind ?? 'sign_in';

  if (accessToken) {
    try {
      const res = await fetch(`${getOwebPlatformApiUrl()}/oneid/activate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ app_id: SWARMUI_APP_ID, activation_kind: kind }),
      });
      if (res.ok) return;
      if (res.status !== 404) {
        console.warn('[swarmui] OWeb app activation HTTP failed', res.status);
      }
    } catch (err) {
      console.warn('[swarmui] OWeb app activation HTTP error', err?.message ?? err);
    }
  }

  const { error } = await supabase.rpc('ao_upsert_app_activation', {
    p_app_id: SWARMUI_APP_ID,
    p_user_id: userId,
    p_activation_kind: kind,
  });
  if (error) console.warn('[swarmui] app activation RPC failed', error.message);
}

export async function activateSwarmUiWorkspace(
  supabase,
  userId,
  workspaceId,
  accessToken,
  activationKind,
) {
  const kind = activationKind ?? 'sign_in';

  if (accessToken) {
    try {
      const res = await fetch(`${getOwebPlatformApiUrl()}/oneid/activate-workspace`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workspace_id: workspaceId, activation_kind: kind }),
      });
      if (res.ok) return;
      if (res.status !== 404) {
        console.warn('[swarmui] OWeb workspace activation HTTP failed', res.status);
      }
    } catch (err) {
      console.warn('[swarmui] OWeb workspace activation HTTP error', err?.message ?? err);
    }
  }

  const { error } = await supabase.rpc('ao_upsert_workspace_activation', {
    p_user_id: userId,
    p_workspace_id: workspaceId,
    p_activation_kind: kind,
  });
  if (error) console.warn('[swarmui] workspace activation RPC failed', error.message);
}
