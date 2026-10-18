export async function fetchMyWorkspaces(supabase, userId) {
  const { data: memberships, error: memberErr } = await supabase
    .from('ao_org_members')
    .select('org_id')
    .eq('user_id', userId)
    .is('left_at', null);

  if (memberErr) {
    console.warn('[swarmui] workspace memberships failed', memberErr.message);
    return [];
  }

  const orgIds = (memberships ?? [])
    .map((m) => m.org_id)
    .filter((id) => Boolean(id));

  if (!orgIds.length) return [];

  const { data: orgs, error: orgErr } = await supabase
    .from('ao_orgs')
    .select('id, name, slug, kind')
    .in('id', orgIds)
    .order('name');

  if (orgErr) {
    console.warn('[swarmui] workspace orgs failed', orgErr.message);
    return [];
  }

  return (orgs ?? []).map((o) => ({
    id: o.id,
    name: o.name,
    slug: o.slug,
    kind: o.kind,
  }));
}

export async function ensurePersonalWorkspace(supabase, userId, displayName) {
  const { data, error } = await supabase.rpc('ao_ensure_personal_workspace', {
    _uid: userId,
    _display_name: displayName,
  });

  if (error) {
    console.warn('[swarmui] personal workspace ensure failed', error.message);
    return null;
  }

  if (typeof data === 'string' && data.length > 0) return data;
  return null;
}

export function pickDefaultWorkspaceId(workspaces) {
  if (!workspaces?.length) return null;
  const personal = workspaces.find((w) => w.kind === 'personal');
  return personal?.id ?? workspaces[0].id;
}
